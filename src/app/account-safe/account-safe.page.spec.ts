import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSafePage } from './account-safe.page';

describe('AccountSafePage', () => {
  let component: AccountSafePage;
  let fixture: ComponentFixture<AccountSafePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSafePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSafePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
