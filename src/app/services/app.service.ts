import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { IndexedDBStorageService } from './indexeddb.service';
import { UserClass, UserChangeEnum } from '../models/user';
import { userList, getimgPathFn } from '../models/constant';
import { ChatMessage } from '../models/message';
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AppService {




    public currentMessageListSubs: Subject<Array<ChatMessage>> = new Subject();

    public realTimeMessageSubs: Subject<ChatMessage> = new Subject();

    constructor(private webSocketService: WebSocketService,
        private indexDBService: IndexedDBStorageService,
        private userService: UserService) {

        this.subscribeToMessageListFn();
        this.subscribeToUserChangeFn();
    }


    getMessageListFn() {
        this.indexDBService.retriveMessageByUserFn(this.userService.currentUser.id,
            this.userService.currentChatUser.id);
    }

    subscribeToMessageListFn() {
        this.indexDBService.getUserMessagesSubject.subscribe((msgList: Array<ChatMessage>) => {
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

    subscribeToUserChangeFn() {
        this.userService.changeInUserSubs.subscribe(resp => {
            if (resp == UserChangeEnum.CurrentUser) {

            }
            else if (resp == UserChangeEnum.CurrentChatUser) {
                this.getMessageListFn();
            }
        })
    }


}