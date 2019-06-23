import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../services/websocket.service';
import { IndexedDBStorageService } from '../services/indexeddb.service';
import { IDbReadyStateEnum } from '../models/indexedbstate';
import { constantMessages } from '../models/constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  /* A variable to hold all the subscribtion in component */
  private subscribtionArr: Subscription[] = [];

  /* Show/Hide loading div based on web socket connection */
  public socketConnected: boolean = false;

  /* Website internet connection */
  public internetConnection: boolean = false;

  /* Connection status  */
  public idBConnectionStatus: IDbReadyStateEnum = IDbReadyStateEnum.Pending;

  constructor(private webSocketService: WebSocketService,
    private indexedDbService: IndexedDBStorageService) {
    window.ononline = (ev) => { this.navigatorConnEventFn(true) };
    window.onoffline = (ev) => { this.navigatorConnEventFn(false) };
  }

  /* On init check for internet connection */
  ngOnInit() {
    /* Check for current internet connection */
    this.internetConnection = window.navigator.onLine;
    /* Subscribe to websocket stauts */
    let webSocketSubs = this.webSocketService.webSocketStateSubject.subscribe(resp => {
      if (resp == WebSocket.OPEN)
        this.socketConnected = true;
      else
        this.socketConnected = false;
    });

    /* Subscribe to indexedDbService status */
    let dbReadyStateSubs = this.indexedDbService.dbReadyStateEmit.subscribe(resp => {
      this.idBConnectionStatus = resp;
    });

    this.subscribtionArr.push(webSocketSubs);
    this.subscribtionArr.push(dbReadyStateSubs);

  }

  /* Onliine/offiline event function for navigator */
  navigatorConnEventFn(online: boolean = false) {
    this.internetConnection = online;
  }


  /* Get required message to display based on the status */
  getMsgToDisplayFn() {
    let msg = ``;
    /* Check for internet connectivity */
    if (this.internetConnection) { //if connected
      /* CHECK for socket connection */
      if (this.socketConnected) { //if connected
        /* Check IndexedDBConnection status */
        msg = this.idBConnectionStatus ==
          IDbReadyStateEnum.Ready ? '' :
          this.idBConnectionStatus == IDbReadyStateEnum.Pending ?
            constantMessages.iDbConnectionWait :
            constantMessages.pageReloadRequireed
      }
      else //If socket is not connected
        msg = constantMessages.gettingConnected;
    }
    else
      msg = constantMessages.offline; //If internet is not provided
    return msg;
  }

  ngOnDestroy(): void {
    this.subscribtionArr.forEach(subs => subs.unsubscribe());
  }

}
