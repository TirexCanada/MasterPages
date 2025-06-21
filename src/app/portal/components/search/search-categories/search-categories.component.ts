import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { ClassifiedService } from '../../../../shared/services/classified.service';
import { CategorySearchItemComponent } from '../../categories/category-search-item/category-search-item.component';
import { ICategory } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-search-categories',
  standalone: true,
  imports: [CommonModule, CategorySearchItemComponent],
  templateUrl: './search-categories.component.html',
  styleUrls: ['./search-categories.component.css']
})
export class SearchCategoriesComponent implements OnInit, OnChanges {
  @Input() tagId: any;
  @Output() selectTag: EventEmitter<any> = new EventEmitter<any>();

  categories: any [];
  subcategories: any [];

  categoriesAll: any [];
  subcategoriesAll: any [];

  selectedCategory: any;
  selectedSubcategory: any;

  constructor(private sessionStorageService: SessionStorageService,
    private classifiedService: ClassifiedService) { }

  ngOnInit(): void {
    let baseRequest = { "requestModelType": "categoriesCounts" }
    this.classifiedService.getCategoriesCounts(baseRequest).subscribe( response => {
      this.categories = response.filter(x => x.categoryParentId === null || x.categoryParentId === undefined || x.categoryParentId === "");
      this.subcategories = response.filter(x => x.categoryParentId !== null && x.categoryParentId !== undefined && x.categoryParentId !== "");

      this.categoriesAll = JSON.parse(JSON.stringify(this.categories));
      this.subcategoriesAll = JSON.parse(JSON.stringify(this.subcategories));

      this.selectedCategory = this.categories.find(x => x.categoryId === this.tagId);
      if (this.selectedCategory === null || this.selectedCategory === undefined) {
        this.selectedSubcategory = this.subcategories.find(x => x.categoryId === this.tagId);
        try {
          this.subcategories = this.subcategories.filter(x => x.categoryParentId === this.selectedSubcategory.categoryParentId);
          this.selectedCategory = this.categories.find(x => x.categoryId === this.selectedSubcategory.categoryParentId);
        }
        catch(e) {}
      }
      else {
        this.subcategories = this.subcategories.filter(x => x.categoryParentId === this.selectedCategory.categoryId);
      }

      if (this.selectedCategory !== null && this.selectedCategory !== undefined) {
        this.categories.map(x => {
          if (x.categoryId === this.selectedCategory.categoryId) {
            x.selected = true;
            x.subcategories = this.subcategories
          }
        })
      }
    })
  }

  ngOnChanges(): void {
    this.selectedCategory = this.categories.find(x => x.categoryId === this.tagId);
    this.categories.map(x => {
      if (x.categoryId === this.selectedCategory.categoryId) {
        x.selected = true;
        this.subcategories = this.subcategoriesAll.filter(x => x.categoryParentId === this.selectedCategory.categoryId);
        x.subcategories = this.subcategories;
      }
      else {
        x.selected = false;
      }
    })
  }

  selectCategory(category: any): void {
    this.selectedCategory = category;

    this.categories.map(x => {
      if (x.categoryId === this.selectedCategory.categoryId) {
        x.selected = true;
        this.subcategories = this.subcategoriesAll.filter(x => x.categoryParentId === this.selectedCategory.categoryId);
        x.subcategories = this.subcategories;
      }
      else {
        x.selected = false;
      }
    })
  }

  selectSubcategory(tagId: any): void {
    this.selectTag.emit(tagId);
  }
}
