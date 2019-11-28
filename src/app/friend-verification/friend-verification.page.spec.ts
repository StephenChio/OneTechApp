import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendVerificationPage } from './friend-verification.page';

describe('FriendVerificationPage', () => {
  let component: FriendVerificationPage;
  let fixture: ComponentFixture<FriendVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendVerificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
