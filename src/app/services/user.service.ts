import { Injectable } from "@angular/core";
import { UserClass, UserChangeEnum } from '../models/user';
import { userList, getimgPathFn } from '../models/constant';
import { Subject } from 'rxjs';

@Injectable()
export class UserService {

    /* CURRENT USER */
    public currentUser: UserClass;

    public currentChatUser: UserClass;

    public changeInUserSubs: Subject<number> = new Subject();

    constructor() {
        this.currentUser = userList[0];
        this.currentChatUser = userList[1];
    }

    setCurrentChatUserFn(id: number) {
        let user = this.getUserByIdFn(id);
        if (user) {
            this.currentChatUser = user;
            this.changeInUserSubs.next(UserChangeEnum.CurrentChatUser);
        }
    }


    getUserByIdFn(id: number) {
        let retValue = undefined;
        let reqUser = userList.filter(x => x.id
            == id);
        if (reqUser.length > 0) {
            retValue = reqUser[0];
        }
        return retValue;
    }

    setCurrentUserFn(id: number) {
        let user = this.getUserByIdFn(id);
        if (user) {
            if (this.currentChatUser.id == id) {
                this.currentChatUser = JSON.parse(JSON.stringify(this.currentUser));
            }
            this.currentUser = user;
            this.changeInUserSubs.next(UserChangeEnum.CurrentUser);
        }
    }



    getImagePathFn(id: number) {
        return getimgPathFn(id);
    }
}