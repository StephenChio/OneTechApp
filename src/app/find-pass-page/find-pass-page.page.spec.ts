import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPassPagePage } from './find-pass-page.page';

describe('FindPassPagePage', () => {
  let component: FindPassPagePage;
  let fixture: ComponentFixture<FindPassPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPassPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPassPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
