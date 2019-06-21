import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebSocketService } from './services/websocket.service';
import { HeaderComponent } from './header/header.component';
import { FriendsComponent } from './friends/friends.component';
import { MessageviewerComponent } from './messageviewer/messageviewer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FriendsComponent,
    MessageviewerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
