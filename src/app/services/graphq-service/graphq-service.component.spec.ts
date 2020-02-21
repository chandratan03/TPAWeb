import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqServiceComponent } from './graphq-service.component';

describe('GraphqServiceComponent', () => {
  let component: GraphqServiceComponent;
  let fixture: ComponentFixture<GraphqServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphqServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphqServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
