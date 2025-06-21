import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockCustomerComponent } from './lock-customer.component';

describe('LockCustomerComponent', () => {
  let component: LockCustomerComponent;
  let fixture: ComponentFixture<LockCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
