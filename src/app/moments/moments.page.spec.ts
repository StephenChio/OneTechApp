import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentsPage } from './moments.page';

describe('MomentsPage', () => {
  let component: MomentsPage;
  let fixture: ComponentFixture<MomentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
