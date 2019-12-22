import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureInformationPage } from './picture-information.page';

describe('PictureInformationPage', () => {
  let component: PictureInformationPage;
  let fixture: ComponentFixture<PictureInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
