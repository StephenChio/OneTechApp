import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTagPage } from './set-tag.page';

describe('SetTagPage', () => {
  let component: SetTagPage;
  let fixture: ComponentFixture<SetTagPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetTagPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetTagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
