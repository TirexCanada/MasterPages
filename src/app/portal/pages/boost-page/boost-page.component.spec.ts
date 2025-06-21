import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoostPageComponent } from './boost-page.component';

describe('BoostPageComponent', () => {
  let component: BoostPageComponent;
  let fixture: ComponentFixture<BoostPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoostPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
