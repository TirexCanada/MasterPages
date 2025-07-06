import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListYourAdComponent } from './list-your-ad.component';

describe('ListYourAdComponent', () => {
  let component: ListYourAdComponent;
  let fixture: ComponentFixture<ListYourAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListYourAdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListYourAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
