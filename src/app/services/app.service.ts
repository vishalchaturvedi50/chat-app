import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { IndexedDBStorageService } from './indexeddb.service';
import { ChatMessage } from '../models/message';
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AppService {

    /* Subject to send all the saved message  */
    public currentMessageListSubs: Subject<Array<ChatMessage>> = new Subject();

    /* Subject to send any real time messages */
    public realTimeMessageSubs: Subject<ChatMessage> = new Subject();

    constructor(private webSocketService: WebSocketService,
        private userService: UserService) {
        /* SUBS to message list  and user changes */
        this.subscribeToIndexDbStateFn();
        this.subscribeToMessageListFn();
        this.subscribeToUserChangeFn();
    }

    /**
     * Get message list for current user and current chat user
     */
    getMessageListFn() {
        this.webSocketService.indexedDbService.
            retriveMessageByUserFn([this.userService.currentUser.id,
            this.userService.currentChatUser.id]);
    }

    /**
     * Function to subscribe to ready state of DB
     */
    subscribeToIndexDbStateFn() {
        this.webSocketService.indexedDbService.
            dbReadyStateEmit.subscribe(() => {
                this.getMessageListFn();
            })
    }
    /**
     * Function with subscribtion to user message and real time messages
     */
    subscribeToMessageListFn() {
        this.webSocketService.indexedDbService
            .getUserMessagesSubject.subscribe((msgList: Array<ChatMessage>) => {
                this.currentMessageListSubs.next(msgList);
            })
        this.webSocketService.realTimeMessageSubject.subscribe((msg: ChatMessage) => {
            this.realTimeMessageSubs.next(msg);
        })
    }

    /**
     * Send message function - responsible for message transfer to websocket
     * @param messageString 
     */
    sendMessageFn(messageString: string) {
        let message: ChatMessage = {
            from: this.userService.currentUser.id,
            to: this.userService.currentChatUser.id,
            message: messageString
        };
        this.webSocketService.sendMessageFn(message);
    }

    /**
     * Subscribe to user change 
     */
    subscribeToUserChangeFn() {
        this.userService.changeInUserSubs.subscribe(() => {
            //For any type of user change get an updated message list
            this.getMessageListFn();
        })
    };


}