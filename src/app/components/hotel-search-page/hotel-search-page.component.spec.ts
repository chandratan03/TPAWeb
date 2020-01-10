import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelSearchPageComponent } from './hotel-search-page.component';

describe('HotelSearchPageComponent', () => {
  let component: HotelSearchPageComponent;
  let fixture: ComponentFixture<HotelSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
