import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFriendPagePage } from './add-friend-page.page';

describe('AddFriendPagePage', () => {
  let component: AddFriendPagePage;
  let fixture: ComponentFixture<AddFriendPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFriendPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFriendPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
