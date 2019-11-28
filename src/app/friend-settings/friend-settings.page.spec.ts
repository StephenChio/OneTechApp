import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendSettingsPage } from './friend-settings.page';

describe('FriendSettingsPage', () => {
  let component: FriendSettingsPage;
  let fixture: ComponentFixture<FriendSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendSettingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
