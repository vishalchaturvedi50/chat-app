import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageviewerComponent } from './messageviewer.component';
import { FormsModule } from '@angular/forms';
import { AppService } from '../services/app.service';
import { UserService } from '../services/user.service';
import { IndexedDBStorageService } from '../services/indexeddb.service';
import { WebSocketService } from '../services/websocket.service';
import { BrowserModule } from '@angular/platform-browser';

describe('MessageviewerComponent', () => {
  let component: MessageviewerComponent;
  let fixture: ComponentFixture<MessageviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageviewerComponent],
      imports: [FormsModule, BrowserModule],
      providers: [AppService, UserService, WebSocketService, IndexedDBStorageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
