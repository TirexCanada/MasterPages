import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

import { DropdownQuestionComponent } from '../../../components/generic-components/dropdown-question/dropdown-question.component';
import { ApplicationService } from '../../../../shared/services/application.service';
import { CustomerService } from '../../../../shared/services/customer.service';
import { ClassifiedService } from '../../../../shared/services/classified.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { ListingBlockComponent } from '../../common/listings/listing-block/listing-block.component';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

import { ICustomer } from '../../../../shared/interfaces/customer.interface';
import { IListing } from '../../../../shared/interfaces/listing.interface';
import { IMessage } from '../../../../shared/interfaces/message.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { SORT_OPTIONS } from '../../../../../app/portal/constants/portal-constants';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule, ListingBlockComponent, DropdownQuestionComponent, TranslateModule],
  providers: [ TranslateService],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnChanges {
  @Input() listings: any [];
  @Input() categoryType: string;
  @Input() selectedCategory: any;
  @Input() tagId: any;
  @Input() form: NgForm;
  isRecentActive: boolean = true;
  currentView: string = "list";
  tags: any[] = [];
  currentTag: any;
  categories: ICategory [];
  subcategories: ICategory [];
  businessFlag: string;
  sortOptionsList: any[] = SORT_OPTIONS;
  model: any = {};
  listingsOrg: any [];
  listingsCount: number = 0;
  
  constructor(private classifiedService: ClassifiedService,
    private sessionStorageService: SessionStorageService,
    public translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.businessFlag = (this.categoryType === "business") ? "1" : "0";

    this.model = {"sortOption": null, "categoryId": this.tagId, "subcategoryId": null};

    this.tags = this.sessionStorageService.getTags();
    this.currentTag = this.tags.find(tag => tag.id === this.tagId);
    this.listings = _.orderBy(this.listings, ["priorityFlag", "listingDate"], ["desc", "desc"]);
    this.listingsOrg = JSON.parse(JSON.stringify(this.listings)); // deep copy
    this.listingsCount = this.listings.length;
  }

  ngOnChanges(): void {
    //this.listings = _.orderBy(this.listings, ["priorityFlag", "listingDate"], ["desc", "desc"]);
    this.listings = _.orderBy(this.listings, ["bannerFlag", "carouselFlag", "listingDate"], ["desc", "desc", "desc"]);
    this.listingsOrg = JSON.parse(JSON.stringify(this.listings)); // deep copy
  
    this.tags = this.sessionStorageService.getTags();
    this.currentTag = this.tags.find(tag => tag.id === this.tagId);
    this.model.categoryId = this.currentTag.id;

    this.categories = this.sessionStorageService.getCategories();
    if (this.businessFlag === "1") {
      this.categories = this.categories.filter(x => x.businessFlag  === true);
    }
    else {
      this.categories = this.categories.filter(x => x.classifiedFlag  === true);
    }

    let selectedCategory = this.categories.find(x => x.id === this.model.categoryId);
    this.subcategories = selectedCategory.subcategoriesInformation;

    if (this.businessFlag === "1") {
      this.subcategories = this.subcategories.filter(x => x.businessFlag === true);
    }
    else {
      this.subcategories = this.subcategories.filter(x => x.classifiedFlag === true);
    }

    this.listingsCount = this.listings.length;
  }

  
  // toggle(view: string) {
  //   this.currentView = view;
  // }

  selectSubcategory() {
    this.listings = JSON.parse(JSON.stringify(this.listingsOrg));

    if (this.model.subcategoryId !== null && this.model.subcategoryId !== undefined) {
      //this.listings = this.listings.filter(x => x.tagId === this.model.subcategoryId);

      let baseRequestModel = { "requestModelType": this.categoryType, "tagId": this.model.subcategoryId };
      this.classifiedService.getListingsByTagId(baseRequestModel).subscribe(
        response => this.getOnSuccess(response),
        response => this.getOnError(response)
      );   
    }
  }

  getOnSuccess(response: any): void {
    this.listings = response;
  }

  private getOnError(response: any): void {
    //TODO
  }

  selectSortOption() {
    let sortOption = this.sortOptionsList.find(x => x.code === this.model.sortOption);
    if (sortOption !== null && sortOption !== undefined) {
      switch (sortOption.code) {
        case "bydateasc":
          this.listings = _.orderBy(this.listings, ["listingDate"], ["asc"]);
          break;
        case "bydatedesc":
          this.listings = _.orderBy(this.listings, ["listingDate"], ["desc"]);
          break;
        case "bytitleasc":
          this.listings = _.orderBy(this.listings, ["title"], ["asc"]);
          break;
        case "bytitledesc":
          this.listings = _.orderBy(this.listings, ["title"], ["desc"]);
          break;
        case "byrelevance":
          this.listings = _.orderBy(this.listings, ["title"], ["asc"]);
          break;
        case "bypopular":
          this.listings = _.orderBy(this.listings, ["hits"], ["desc"]);
          break;
      }
    }
  }
}
