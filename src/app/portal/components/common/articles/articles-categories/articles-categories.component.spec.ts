import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesCategoriesComponent } from './articles-categories.component';

describe('ArticlesCategoriesComponent', () => {
  let component: ArticlesCategoriesComponent;
  let fixture: ComponentFixture<ArticlesCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticlesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
