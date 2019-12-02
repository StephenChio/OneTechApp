import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteVerifiCodePage } from './write-verifi-code.page';

describe('WriteVerifiCodePage', () => {
  let component: WriteVerifiCodePage;
  let fixture: ComponentFixture<WriteVerifiCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteVerifiCodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteVerifiCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
