import { Component, OnInit, Input } from '@angular/core';
import { UserClass } from '../models/user';
import { AppService } from '../services/app.service';
import { UserService } from '../services/user.service';
import { userList } from '../models/constant';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {


  @Input() showSelect: boolean = false;

  @Input() user: UserClass = new UserClass();

  public friendList: Array<UserClass> = [];

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.friendList = userList;
  }


  changeInCurrentUserFn(ev: any) {
    this.userService.setCurrentUserFn(ev.target.value);
  }

}
