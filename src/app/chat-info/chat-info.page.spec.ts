import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInfoPage } from './chat-info.page';

describe('ChatInfoPage', () => {
  let component: ChatInfoPage;
  let fixture: ComponentFixture<ChatInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
