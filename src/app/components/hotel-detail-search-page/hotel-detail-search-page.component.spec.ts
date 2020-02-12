import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetailSearchPageComponent } from './hotel-detail-search-page.component';

describe('HotelDetailSearchPageComponent', () => {
  let component: HotelDetailSearchPageComponent;
  let fixture: ComponentFixture<HotelDetailSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelDetailSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDetailSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
