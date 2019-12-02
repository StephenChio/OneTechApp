import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiPagePage } from './verifi-page.page';

describe('VerifiPagePage', () => {
  let component: VerifiPagePage;
  let fixture: ComponentFixture<VerifiPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
