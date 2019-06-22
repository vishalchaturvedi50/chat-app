import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppService } from '../services/app.service';
import { ChatMessage } from '../models/message';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-messageviewer',
  templateUrl: './messageviewer.component.html',
  styleUrls: ['./messageviewer.component.scss']
})
export class MessageviewerComponent implements OnInit {

  @ViewChild('messageListElem') messageListUlElement: ElementRef;


  public currentMessage: string = "";

  public messageList: Array<ChatMessage> = [];

  constructor(public appService: AppService,
    public userService: UserService) { }

  ngOnInit() {
    this.subscribeToMessageListFn();
  }

  subscribeToMessageListFn() {
    this.appService.currentMessageListSubs.subscribe((msgList: Array<ChatMessage>) => {
      
      this.messageList = msgList;
      this.scrollToBottomFn();
    });

    this.appService.realTimeMessageSubs.subscribe((msg: ChatMessage) => {
      this.messageList.push(msg);
      this.scrollToBottomFn();
    })
  }


  sendMessageFn() {
    this.appService.sendMessageFn(this.currentMessage);
    this.currentMessage = "";
  }

  trackMessageListFn(index, item) {
    if (item)
      return item.id;
  }


  scrollToBottomFn() {
     setTimeout(() => {
       let element: HTMLElement = this.messageListUlElement.nativeElement;
       element.scrollTo(element.scrollHeight, element.scrollHeight);
     })
  }
}