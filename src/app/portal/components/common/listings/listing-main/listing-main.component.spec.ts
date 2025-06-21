import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingMainComponent } from './listing-main.component';

describe('ListingMainComponent', () => {
  let component: ListingMainComponent;
  let fixture: ComponentFixture<ListingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
