import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { IndexedDBStorageService } from './indexeddb.service';
import { UserClass } from '../models/user';
import { userList, getimgPathFn } from '../models/constant';

@Injectable()
export class AppService {


    /* CURRENT USER */
    public currentUser: UserClass;

    public currentChatUser: UserClass;

    constructor(private webSocket: WebSocketService,
        private indexDBService: IndexedDBStorageService) {
        this.currentUser = userList[0];
        this.currentChatUser = userList[1];
    }


    setCurrentChatUserFn(id: number) {
        let reqUser = userList.filter(x => x.id
            == id);
        if (reqUser.length > 0)
            this.currentChatUser = reqUser[0];
    }



    getImagePathFn(id: number) {
        return getimgPathFn(id);
    }



}