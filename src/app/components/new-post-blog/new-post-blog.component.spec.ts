import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostBlogComponent } from './new-post-blog.component';

describe('NewPostBlogComponent', () => {
  let component: NewPostBlogComponent;
  let fixture: ComponentFixture<NewPostBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPostBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
