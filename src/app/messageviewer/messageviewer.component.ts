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

  /* View child for ul element which shows all the messages */
  @ViewChild('messageListElem') messageListUlElement: ElementRef;

  /* NGModel for current message user is typing */
  public currentMessage: string = "";

  /* Message list */
  public messageList: Array<ChatMessage> = [];

  /* Constructor */
  constructor(public appService: AppService,
    public userService: UserService) { }

  ngOnInit() {
    this.subscribeToMessageListFn();
  }

  /**
   * Subscribe to various message list
   */
  subscribeToMessageListFn() {
    /* A subscription to get all the previous message from the user */
    this.appService.currentMessageListSubs.subscribe((msgList: Array<ChatMessage>) => {
      this.messageList = msgList; //Assign it to meesage list
      this.scrollToBottomFn();//scroll to bottom
    });

    /*Subscribtion for real time message (incremental)  */
    this.appService.realTimeMessageSubs.subscribe((msg: ChatMessage) => {
      this.messageList.push(msg); //push to message list
      this.scrollToBottomFn(); //scroll to bottom
    })
  }

  /**
   * Send message Fn
   */
  sendMessageFn() {
    //Send current message 
    this.appService.sendMessageFn(this.currentMessage);
    //Clean the message
    this.currentMessage = "";
  }

  /**
   * Scroll to bottom 
   */
  scrollToBottomFn() {
    setTimeout(() => {
      let element: HTMLElement = this.messageListUlElement.nativeElement; //Get the elment
      element.scrollTo(element.scrollHeight, element.scrollHeight); //scroll it to element height
    })
  }

  /**
   * Track by fn for message list
   * @param index 
   * @param item 
   */
  trackMessageListFn(index, item) {
    if (item)
      return item.id;
  }
}
