import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemakersAndTagPage } from './remakers-and-tag.page';

describe('RemakersAndTagPage', () => {
  let component: RemakersAndTagPage;
  let fixture: ComponentFixture<RemakersAndTagPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemakersAndTagPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemakersAndTagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
