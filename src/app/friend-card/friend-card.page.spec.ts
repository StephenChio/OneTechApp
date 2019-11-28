import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendCardPage } from './friend-card.page';

describe('FriendCardPage', () => {
  let component: FriendCardPage;
  let fixture: ComponentFixture<FriendCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
