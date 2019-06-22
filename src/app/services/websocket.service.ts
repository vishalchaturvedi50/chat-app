import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/message';
import { IndexedDBStorageService } from './indexeddb.service';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import { webSocketURi } from '../models/constant';
@Injectable()
export class WebSocketService {

    /* WEB SOCKET URL */
    private webSocketUri: string = webSocketURi;

    //SOCKET variable
    private socket: WebSocket;

    //Subject to send any realtime message
    public realTimeMessageSubject: Subject<ChatMessage> = new Subject();

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
    }

    /**
     * Send message function
     * @param message : message which need to be send 
     */
    sendMessageFn(message: ChatMessage) {
        this.socket.send(JSON.stringify(message));
        this.indexedDbService.addDataToStorageFn(message).onsuccess = () => {
            this.realTimeMessageSubject.next(message);
        };

    }

    /**
     * Function when a message is received
     * @param ev 
     */
    onMessageFn(ev: any) {
        console.log(ev.data);
        let message: ChatMessage = JSON.parse(ev.data);
        let userIdArr = [this.userService.currentChatUser.id, this.userService.currentUser.id];
        if (userIdArr.indexOf(message.from) > -1 &&
            userIdArr.indexOf(message.to) > -1) {
            this.realTimeMessageSubject.next(message);
        }
    }

    /**
     * Function being called when an error occurred
     * @param ev 
     */
    onErrorFn(ev: any) {
        console.log(ev);
        this.connectFn();
    }

    /**
     * Function being called when connection is closed
     * @param ev 
     */
    onCloseFn(ev: any) {
        console.log(ev);
        setTimeout(() => {
            this.connectFn();
        });
    }


}