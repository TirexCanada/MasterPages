import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingContactInfoComponent } from './listing-contact-info.component';

describe('ListingContactInfoComponent', () => {
  let component: ListingContactInfoComponent;
  let fixture: ComponentFixture<ListingContactInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingContactInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
