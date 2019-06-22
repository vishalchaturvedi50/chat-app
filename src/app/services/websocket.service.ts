import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/message';
import { IndexedDBStorageService } from './indexeddb.service';
import { AppService } from './app.service';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
@Injectable()
export class WebSocketService {

    /* WEB SOCKET URL */
    private webSocketUri: string = "wss://connect.websocket.in/web-chat-app-xyz12";

    //SOCKET variable
    private socket: WebSocket;

    //Subject to send any realtime message
    public realTimeMessageSubject: Subject<ChatMessage> = new Subject();

    constructor(private indexedDbService: IndexedDBStorageService,
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
        this.indexedDbService.addDataToStorageFn(message).onsuccess = (ev) => {
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
        if (message.from == this.userService.currentUser.id ||
            message.to == this.userService.currentUser.id) {
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