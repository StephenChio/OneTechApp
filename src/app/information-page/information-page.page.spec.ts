import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationPagePage } from './information-page.page';

describe('InformationPagePage', () => {
  let component: InformationPagePage;
  let fixture: ComponentFixture<InformationPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
