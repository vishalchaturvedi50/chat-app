import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/message';
import { IndexedDBStorageService } from './indexeddb.service';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import { webSocketURi, _chatEqualFn } from '../models/constant';
@Injectable()
export class WebSocketService {

    /* WEB SOCKET URL */
    private webSocketUri: string = webSocketURi;

    //SOCKET variable
    private socket: WebSocket;

    //Subject to send any realtime message
    public realTimeMessageSubject: Subject<ChatMessage> = new Subject();

    //Emitter of current state for websocket
    public webSocketStateSubject: Subject<number> = new Subject();

    constructor(public indexedDbService: IndexedDBStorageService,
        private userService: UserService) {
        //Connect Function
        this.connectFn();
    }


    /* CONNECT TO SOCKET */
    connectFn() {
        this.socket = new WebSocket(this.webSocketUri);
        //Assign functions for various state
        this.socket.onopen = (ev) => { this.onConnectionOpenFn(ev); };
        this.socket.onmessage = (ev) => { this.onMessageFn(ev); };
        this.socket.onerror = (ev) => { this.onErrorFn(ev) };
        this.socket.onclose = (ev) => { this.onCloseFn(ev); };
    }

    /**
     * Function being called when the connection is opened
     * @param ev 
     */
    onConnectionOpenFn(ev: Event): any {
        console.log(ev);
        this.emitStateFn(this.socket.readyState);
    }

    /**
     * Send message function
     * @param message : message which need to be send 
     */
    sendMessageFn(message: ChatMessage) {
        /* 
        If you are at the sender of the message then store the message in the indexed DB
        */
        this.indexedDbService.addDataToStorageFn(message).onsuccess = (ev) => {
            console.log(ev);
            message.id = (<any>ev.target).result; //Assign the id from the DB
            this.socket.send(JSON.stringify(message)); //send the message through socket
            this.validateAndEmitRealTimeMessageFn(message);
        };

    }

    /**
     * Function when a message is received on all the socket listening to the same socket uri
     * There can be two use cases in our POC
     * 1. we are running two chat window side by side 
     * 2. we are opening one in one browser and other in say mobile app 
     * 
     * To validate both the use case we have some edgecase implementation
     * 1. As seen in above method of sendMessageFn - we first save date in DB and then send it across
     * 2. If the user is opening the chat window side by side (in this case if we directly store data message will be repeated twice)
     *      a. we will get message with same id 
     *      b. With a custom implementation of compare object we will se if it is exactly same record (timestamp plays a major role here)
     *      c. In case you are opening the app side by side the addNewRecord will be false and hence we will not add the record. 
     *      d. In case you are opening on two different devices we will get addNewRecord as true. 
     * @param ev : Message event
     */
    onMessageFn(ev: any) {
        console.log(ev.data);
        let message: ChatMessage = JSON.parse(ev.data);

        //Check whether record with the same id exisist or not
        this.indexedDbService.getRecordByIdFn(message.id).onsuccess = (ev) => {
            //If 
            let dbStoredRecord: ChatMessage = (<any>ev.target).result;
            let addNewRecord = dbStoredRecord != undefined ? !_chatEqualFn(
                JSON.parse(JSON.stringify(dbStoredRecord)), message) : true;

            /* Add new record if the condition is true */
            if (addNewRecord) {
                this.indexedDbService.addDataToStorageFn(message).onsuccess = () => {
                    this.validateAndEmitRealTimeMessageFn(message);
                };
            }
            else
                this.validateAndEmitRealTimeMessageFn(message);
        }
    }


    /**
     * Validate message before sending
     * @param message 
     */
    validateAndEmitRealTimeMessageFn(message: ChatMessage) {
        let userIdArr = [this.userService.currentChatUser.id, this.userService.currentUser.id];
        if (userIdArr.indexOf(message.from) > -1 &&
            userIdArr.indexOf(message.to) > -1) {
            //if yes then send the mssages through realtimemessagesubject (incremental)
            this.realTimeMessageSubject.next(message);
        }
    }



    /**
     * Function being called when an error occurred
     * @param ev 
     */
    onErrorFn(ev: any) {
        console.log(ev);
        this.emitStateFn(this.socket.readyState);
    }

    /**
     * Function being called when connection is closed
     * @param ev 
     */
    onCloseFn(ev: any) {
        console.log(ev);
        setTimeout(() => {
            this.connectFn();
        }, 2000);
        this.emitStateFn(this.socket.readyState);
    }

    emitStateFn(state: number) {
        this.webSocketStateSubject.next(state);
    }

}