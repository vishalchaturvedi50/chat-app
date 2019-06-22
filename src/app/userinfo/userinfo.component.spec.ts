import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoComponent } from './userinfo.component';
import { UserService } from '../services/user.service';
import { userList } from '../models/constant';

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

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  /* 
    it('should have a user title', () => {
      const fixture = TestBed.createComponent(UserinfoComponent);
      fixture.detectChanges();
      component.user = userList[0];
      component.pro
      const compiled: HTMLElement = fixture.debugElement.nativeElement;
      expect(compiled.getElementsByClassName('user-info-title')[0].textContent).
        toContain(component.userService.currentUser.userName);
    }); */

});
