import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEventPageComponent } from './manage-event-page.component';

describe('ManageEventPageComponent', () => {
  let component: ManageEventPageComponent;
  let fixture: ComponentFixture<ManageEventPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEventPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
