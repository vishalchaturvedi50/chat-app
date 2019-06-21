import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageviewerComponent } from './messageviewer.component';

describe('MessageviewerComponent', () => {
  let component: MessageviewerComponent;
  let fixture: ComponentFixture<MessageviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageviewerComponent ]
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
