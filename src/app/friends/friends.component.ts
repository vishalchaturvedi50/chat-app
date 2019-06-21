import { Component, OnInit } from '@angular/core';
import { UserClass } from '../models/user';
import { userList } from '../models/constant';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {


  public friendList: Array<UserClass> = [];

  constructor(public appService: AppService) { }

  ngOnInit() {
    this.friendList = userList.filter(x => x.id != this.appService.currentUser.id);
  }

  onUserItemClickFn(ev: any) {
    let requiredListItem = ev.path.filter(x => x.localName == "li")[0];
    let requiredUserId = requiredListItem.id.split("user")[1];
    this.appService.setCurrentChatUserFn(parseInt(requiredUserId));
  }

}
