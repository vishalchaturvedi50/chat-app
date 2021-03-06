import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserClass, UserChangeEnum } from '../models/user';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, OnDestroy {

  /* SUBSCRibtion objects */
  private subsChangeInUser: Subscription;

  /* Friend list */
  public friendList: Array<UserClass> = [];

  constructor(public userService: UserService) { }

  ngOnInit() {
    /* ON INIT SUBS. to user change and and initialize friend list accordingly */
    this.subsChangeInUser = this.userService.changeInUserSubs.subscribe(resp => {
      if (resp == UserChangeEnum.CurrentUser) {
        this.getFriendListFn();
      }
    });

    this.getFriendListFn();
  }

  /* Function to get Friend list */
  getFriendListFn() {
    this.friendList = this.userService.getFriendListFn();
  }

  /* WHEN a user is clicked from the list change current chat user */
  onUserItemClickFn(ev: any) {
    let paths = ev.path || (event.composedPath && event.composedPath());
    //GET THE required li item from the chain
    let requiredListItemArr = paths.filter(x => x.localName == "li");
    //if we get the item
    if (requiredListItemArr.length > 0) {
      //split and get user id
      let requiredUserId = requiredListItemArr[0].id.split("user")[1];
      //send it the user service for current user change
      this.userService.setCurrentChatUserFn(parseInt(requiredUserId));
    }
  }

  /* Track function for ngFor */
  trackFriendListFn(index, item) {
    if (item)
      return item.id;
  }

  ngOnDestroy(): void {
    this.subsChangeInUser.unsubscribe();
  }
}
