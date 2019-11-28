import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMomentsPage } from './text-moments.page';

describe('TextMomentsPage', () => {
  let component: TextMomentsPage;
  let fixture: ComponentFixture<TextMomentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextMomentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextMomentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
