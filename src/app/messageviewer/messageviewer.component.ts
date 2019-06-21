import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { ChatMessage } from '../models/message';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-messageviewer',
  templateUrl: './messageviewer.component.html',
  styleUrls: ['./messageviewer.component.scss']
})
export class MessageviewerComponent implements OnInit {

  public currentMessage: string = "";

  public messageList: Array<ChatMessage> = [];

  constructor(public appService: AppService,
    public userService: UserService) { }

  ngOnInit() {
    this.subscribeToMessageListFn();
    setTimeout(() => { this.appService.getMessageListFn(); }, 4000);
  }

  subscribeToMessageListFn() {
    this.appService.currentMessageListSubs.subscribe((msgList: Array<ChatMessage>) => {
      this.messageList = msgList;
    });

    this.appService.realTimeMessageSubs.subscribe((msg: ChatMessage) => {
      this.messageList.push(msg);
    })
  }


  sendMessageFn() {
    this.appService.sendMessageFn(this.currentMessage);
    this.currentMessage = "";
  }

}
