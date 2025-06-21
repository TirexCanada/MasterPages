import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestValidationCodeComponent } from './request-validation-code.component';

describe('RequestValidationCodeComponent', () => {
  let component: RequestValidationCodeComponent;
  let fixture: ComponentFixture<RequestValidationCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestValidationCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestValidationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
