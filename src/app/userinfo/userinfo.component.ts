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

  /* Show select or not (it should be visisble for changing currentuser) */
  @Input() showSelect: boolean = false;

  /* User : for which details has to be shown */
  @Input() user: UserClass = new UserClass();

  /* Friend list */
  public userList: Array<UserClass> = userList;

  constructor(public userService: UserService) { }

  ngOnInit() {

  }

  /*  Change in current user */
  changeInCurrentUserFn(ev: any) {
    this.userService.setCurrentUserFn(ev.target.value);
  }

}
