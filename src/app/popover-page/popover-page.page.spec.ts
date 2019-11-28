import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverPagePage } from './popover-page.page';

describe('PopoverPagePage', () => {
  let component: PopoverPagePage;
  let fixture: ComponentFixture<PopoverPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
