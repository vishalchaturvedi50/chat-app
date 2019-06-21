import { Component } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { IndexedDBStorageService } from './services/indexeddb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-app';
  constructor(private webSocket: WebSocketService, private wee: IndexedDBStorageService) { }
}
