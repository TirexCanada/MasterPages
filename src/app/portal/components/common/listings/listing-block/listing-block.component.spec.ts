import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingBlockComponent } from './listing-block.component';

describe('ListingBlockComponent', () => {
  let component: ListingBlockComponent;
  let fixture: ComponentFixture<ListingBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
