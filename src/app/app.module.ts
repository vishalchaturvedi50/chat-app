import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WebSocketService } from './services/websocket.service';
import { FriendsComponent } from './friends/friends.component';
import { MessageviewerComponent } from './messageviewer/messageviewer.component';
import { AppService } from './services/app.service';
import { IndexedDBStorageService } from './services/indexeddb.service';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { FormsModule } from "@angular/forms";
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    FriendsComponent,
    MessageviewerComponent,
    UserinfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [WebSocketService, AppService, IndexedDBStorageService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
