import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionPage } from './expression.page';

describe('ExpressionPage', () => {
  let component: ExpressionPage;
  let fixture: ComponentFixture<ExpressionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
