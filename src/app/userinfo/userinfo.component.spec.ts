import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoComponent } from './userinfo.component';
import { UserService } from '../services/user.service';

describe('UserinfoComponent', () => {
  let component: UserinfoComponent;
  let fixture: ComponentFixture<UserinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserinfoComponent],
      providers: [UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create user info componenet', () => {
    expect(component).toBeTruthy();
  });
});
