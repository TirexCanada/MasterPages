import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifiedComponent } from './classified.component';

describe('ClassifiedComponent', () => {
  let component: ClassifiedComponent;
  let fixture: ComponentFixture<ClassifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassifiedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
