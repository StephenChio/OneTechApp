import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialInformationPage } from './social-information.page';

describe('SocialInformationPage', () => {
  let component: SocialInformationPage;
  let fixture: ComponentFixture<SocialInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
