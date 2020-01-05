import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModal2Component } from './login-modal2.component';

describe('LoginModal2Component', () => {
  let component: LoginModal2Component;
  let fixture: ComponentFixture<LoginModal2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginModal2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
