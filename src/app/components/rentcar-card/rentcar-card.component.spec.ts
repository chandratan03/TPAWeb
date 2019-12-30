import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentcarCardComponent } from './rentcar-card.component';

describe('RentcarCardComponent', () => {
  let component: RentcarCardComponent;
  let fixture: ComponentFixture<RentcarCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentcarCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentcarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
