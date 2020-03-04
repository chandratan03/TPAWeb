import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrderComponent } from './event-order.component';

describe('EventOrderComponent', () => {
  let component: EventOrderComponent;
  let fixture: ComponentFixture<EventOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
