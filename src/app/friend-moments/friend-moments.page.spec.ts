import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendMomentsPage } from './friend-moments.page';

describe('FriendMomentsPage', () => {
  let component: FriendMomentsPage;
  let fixture: ComponentFixture<FriendMomentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendMomentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendMomentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
