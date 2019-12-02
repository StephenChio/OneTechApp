import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhonePagePage } from './change-phone-page.page';

describe('ChangePhonePagePage', () => {
  let component: ChangePhonePagePage;
  let fixture: ComponentFixture<ChangePhonePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhonePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhonePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
