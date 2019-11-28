import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFriendPage } from './new-friend.page';

describe('NewFriendPage', () => {
  let component: NewFriendPage;
  let fixture: ComponentFixture<NewFriendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFriendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFriendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
