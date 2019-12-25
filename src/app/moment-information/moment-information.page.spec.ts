import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentInformationPage } from './moment-information.page';

describe('MomentInformationPage', () => {
  let component: MomentInformationPage;
  let fixture: ComponentFixture<MomentInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
