import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectServiceComponent } from './select-service.component';

describe('SelectServiceComponent', () => {
  let component: SelectServiceComponent;
  let fixture: ComponentFixture<SelectServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
