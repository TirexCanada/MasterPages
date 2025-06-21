import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostContactComponent } from './add-post-contact.component';

describe('AddPostContactComponent', () => {
  let component: AddPostContactComponent;
  let fixture: ComponentFixture<AddPostContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
