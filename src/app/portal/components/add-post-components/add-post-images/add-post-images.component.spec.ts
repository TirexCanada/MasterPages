import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostImagesComponent } from './add-post-images.component';

describe('AddPostImagesComponent', () => {
  let component: AddPostImagesComponent;
  let fixture: ComponentFixture<AddPostImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
