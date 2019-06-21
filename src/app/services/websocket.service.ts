import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/message';
import { IndexedDBStorageService } from './indexeddb.service';
import { AppService } from './app.service';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
@Injectable()
export class WebSocketService {

    private webSocketUri: string = "wss://connect.websocket.in/web-chat-app-xyz12";

    private socket: WebSocket;

    public realTimeMessageSubject: Subject<ChatMessage> = new Subject();

    constructor(private indexedDbService: IndexedDBStorageService,
        private userService: UserService) {
        this.connectFn();
        this.socket.onopen = this.onConnectionOpenFn;
        this.socket.onmessage = (ev) => {
            this.onMessageFn(ev);
        };
        this.socket.onerror = this.onErrorFn;
        this.socket.onclose = (ev) => {
            this.onCloseFn(ev);
        };
    }


    /* CONNECT TO SOCKET */
    connectFn() {
        this.socket = new WebSocket(this.webSocketUri);
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
        this.realTimeMessageSubject.next(message);
    }

    /**
     * Function when a message is received
     * @param ev 
     */
    onMessageFn(ev: any) {
        console.log(ev.data);
        let message: ChatMessage = JSON.parse(ev.data);
        this.indexedDbService.addDataToStorageFn(message).onsuccess = (ev) => {
            console.log("DATA SAVED");
            if (message.from == this.userService.currentUser.id ||
                message.to == this.userService.currentUser.id)
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
        this.connectFn();
    }


}