import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebSocketService } from './services/websocket.service';
import { HeaderComponent } from './header/header.component';
import { FriendsComponent } from './friends/friends.component';
import { MessageviewerComponent } from './messageviewer/messageviewer.component';
import { AppService } from './services/app.service';
import { IndexedDBStorageService } from './services/indexeddb.service';
import { UserinfoComponent } from './userinfo/userinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FriendsComponent,
    MessageviewerComponent,
    UserinfoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WebSocketService, AppService, IndexedDBStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
