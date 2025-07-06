import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsBoxComponent } from './ads-box.component';

describe('AdsBoxComponent', () => {
  let component: AdsBoxComponent;
  let fixture: ComponentFixture<AdsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
