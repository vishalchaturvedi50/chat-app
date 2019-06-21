import { Injectable } from "@angular/core";
import { UserClass } from '../models/user';
import { userList, getimgPathFn } from '../models/constant';

@Injectable()
export class UserService {

    /* CURRENT USER */
    public currentUser: UserClass;

    public currentChatUser: UserClass;

    constructor() {
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