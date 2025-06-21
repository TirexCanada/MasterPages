import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPageBannerComponent } from './full-page-banner.component';

describe('FullPageBannerComponent', () => {
  let component: FullPageBannerComponent;
  let fixture: ComponentFixture<FullPageBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullPageBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPageBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
