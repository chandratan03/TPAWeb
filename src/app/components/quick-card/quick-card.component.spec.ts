import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCardComponent } from './quick-card.component';

describe('QuickCardComponent', () => {
  let component: QuickCardComponent;
  let fixture: ComponentFixture<QuickCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
