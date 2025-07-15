import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { SearchCategoriesComponent } from '../search-categories/search-categories.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { SearchLocationComponent } from '../search-location/search-location.component';
import { RequestFormComponent } from '../../common/request-form/request-form.component';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { IListing } from '../../../../shared/interfaces/listing.interface';
import { CommonModule } from '@angular/common';
import { ClassifiedService } from '../../../../shared/services/classified.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { cloneDeep, sortBy } from 'lodash';

@Component({
  selector: 'app-search-main',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchCategoriesComponent, SearchResultsComponent, SearchLocationComponent, RequestFormComponent],
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.css']
})
export class SearchMainComponent implements OnInit, OnChanges {
  categories: ICategory [];
  subcategories: ICategory [];
  selectedCategory: ICategory;

  @Input() tagId: any;
  @Input() listings: any [];
  @Input() categoryType: string;

  categoryTopListings: any[]; //IListing;

  constructor(private classifiedService: ClassifiedService, 
    private sessionStorageService: SessionStorageService,
    public translateService: TranslateService) { 
  }

  ngOnInit(): void {
    this.listings = this.listings;
    this.tagId = this.tagId;
  }

  ngOnChanges(): void {
    this.listings = this.listings;
    this.categoryTopListings = cloneDeep(this.listings);
    this.categoryTopListings = this.categoryTopListings?.filter(x => x.tagId === this.tagId)
    this.categoryTopListings = sortBy(this.categoryTopListings, ['listingDate'], ['desc'])?.slice(0, 5);

    this.tagId = this.tagId;

    let orgCategories = this.sessionStorageService.getCategories();
    let categoriesClone1 = JSON.parse(JSON.stringify(orgCategories));
    let categoriesClone2 = JSON.parse(JSON.stringify(orgCategories));
    //if (this.businessFlag === "1") {
      this.categories = categoriesClone1.filter(x => x.businessFlag  === true);
      this.selectedCategory = categoriesClone2.find(x => x.id  === this.tagId);
    // }
    // else {
    //   this.categories = this.categories.filter(x => x.classifiedFlag  === true);
    // }
  }

  onSubmitSearch(listings) {
    this.listings = listings;
  }

  onTagSelected(event) {
    this.tagId = event;
    let baseRequestModel = { "requestModelType": this.categoryType, "tagId": this.tagId };
    this.classifiedService.getListingsByTagId(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );   
  }

  getOnSuccess(response: any): void {
    this.listings = response;

    this.categoryTopListings = cloneDeep(this.listings);
    this.categoryTopListings = this.categoryTopListings?.filter(x => x.tagId === this.tagId)
    this.categoryTopListings = sortBy(this.categoryTopListings, ['listingDate'], ['desc'])?.slice(0, 5);

    this.tagId = this.tagId;

    let orgCategories = this.sessionStorageService.getCategories();
    let categoriesClone1 = JSON.parse(JSON.stringify(orgCategories));
    let categoriesClone2 = JSON.parse(JSON.stringify(orgCategories));
    //if (this.businessFlag === "1") {
      this.categories = categoriesClone1.filter(x => x.businessFlag  === true);
      this.selectedCategory = categoriesClone2.find(x => x.id  === this.tagId);
    // }
    // else {
    //   this.categories = this.categories.filter(x => x.classifiedFlag  === true);
    // }
  }

  private getOnError(response: any): void {
    //TODO
  }
}
