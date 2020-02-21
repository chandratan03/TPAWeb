import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrainComponent } from './manage-train.component';

describe('ManageTrainComponent', () => {
  let component: ManageTrainComponent;
  let fixture: ComponentFixture<ManageTrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
