import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostMapComponent } from './add-post-map.component';

describe('AddPostMapComponent', () => {
  let component: AddPostMapComponent;
  let fixture: ComponentFixture<AddPostMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
