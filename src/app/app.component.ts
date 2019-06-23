import { Component } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { IndexedDBStorageService } from './services/indexeddb.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-app';
  constructor(public userService: UserService) { }
}
