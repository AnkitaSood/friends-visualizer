import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualComponent } from './visual.component';
import {LinkVisualComponent} from './link-visual.component';
import {NodeVisualComponent} from './node-visual.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('VisualComponent', () => {
  let component: VisualComponent;
  let fixture: ComponentFixture<VisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // LinkVisualComponent,
        // NodeVisualComponent
      ],
      declarations: [ VisualComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualComponent);
    component = fixture.componentInstance;
    component.currentUser = {
      id: 1,
      firstName: 'User',
      lastName: 'User',
      friends: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
