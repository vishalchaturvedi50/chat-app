import { Component, OnInit, Input } from '@angular/core';
import { UserClass } from '../models/user';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {


  @Input() user: UserClass = new UserClass();

  constructor(public appService: AppService) { }

  ngOnInit() {
  }

}
