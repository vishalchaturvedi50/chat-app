import { Injectable } from "@angular/core";
import { UserClass, UserChangeEnum } from '../models/user';
import { userList, getimgPathFn } from '../models/constant';
import { Subject } from 'rxjs';

@Injectable()
export class UserService {

    /* CURRENT USER */
    public currentUser: UserClass;

    /* Current chat user */
    public currentChatUser: UserClass;

    /* Subject for emitting change in any of the user */
    public changeInUserSubs: Subject<number> = new Subject();

    constructor() {
        //Initial assignment of user
        this.currentUser = userList[0];
        this.currentChatUser = userList[1];
        this.changeInUserSubs.next(UserChangeEnum.CurrentChatUser);
    }


    /**
     *Function to set current chat user based on id
     *  @param id: Id of the user selected
     */
    setCurrentChatUserFn(id: number) {
        let user = this.getUserByIdFn(id);
        if (user) {
            this.currentChatUser = user;
            this.changeInUserSubs.next(UserChangeEnum.CurrentChatUser);
        }
    }

    /**
     * Function to filter and return user object based on id
     * @param id : user id
     */
    getUserByIdFn(id: number) {
        let retValue = undefined;
        let reqUser = userList.filter(x => x.id
            == id);
        if (reqUser.length > 0) {
            retValue = reqUser[0];
        }
        return retValue;
    }

    /**
     * Function to set currrent user 
     * @param id: Id of the current user
     */
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

    /* Function to get friend list by filtering the current user */
    getFriendListFn() {
        return userList.filter(x => x.id != this.currentUser.id);
    }

    /* Function to get image path of the id(user id) provided */
    getImagePathFn(id: number) {
        return getimgPathFn(id);
    }
}