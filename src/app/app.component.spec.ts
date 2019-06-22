import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FriendsComponent } from './friends/friends.component';
import { MessageviewerComponent } from './messageviewer/messageviewer.component';
import { AppService } from './services/app.service';
import { WebSocketService } from './services/websocket.service';
import { IndexedDBStorageService } from './services/indexeddb.service';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FriendsComponent,
        MessageviewerComponent,
        UserinfoComponent
      ],
      imports: [FormsModule],
      providers: [UserService, AppService, WebSocketService, IndexedDBStorageService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'chat-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('chat-app');
  });
});
