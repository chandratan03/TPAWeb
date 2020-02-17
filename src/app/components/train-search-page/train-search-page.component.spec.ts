import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainSearchPageComponent } from './train-search-page.component';

describe('TrainSearchPageComponent', () => {
  let component: TrainSearchPageComponent;
  let fixture: ComponentFixture<TrainSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
