import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelSearchPage2Component } from './hotel-search-page2.component';

describe('HotelSearchPage2Component', () => {
  let component: HotelSearchPage2Component;
  let fixture: ComponentFixture<HotelSearchPage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelSearchPage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelSearchPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
