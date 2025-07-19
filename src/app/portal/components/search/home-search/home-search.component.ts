import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';

import { CategoryIconComponent } from '../../../components/categories/category-icon/category-icon.component';
import { OneLineQuestionComponent } from '../../../components/generic-components/one-line-question/one-line-question.component';

import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { ClassifiedService } from '../../../../shared/services/classified.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { SupportService } from '../../../../shared/services/support.service';


import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ILocation } from '../../../../shared/interfaces/location.interface';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, CategoryIconComponent, OneLineQuestionComponent],
  providers: [SessionStorageService, ClassifiedService, SupportService, TranslateService],
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss']
})
export class HomeSearchComponent implements OnInit {

  searchModel: any;
  sortByOptionsData: any [];
  categories: ICategory [];
  locations: ILocation [];
  
  @ViewChild('form', { static: true }) form: NgForm;

  constructor(private sessionStorageService: SessionStorageService,
    private classifiedService: ClassifiedService,
    private supportService: SupportService,
    public translateService: TranslateService,
    private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.searchModel = { "searchCategoryId": null, "searchText": null };
    this.getCategories();
    this.getLocations();
   
  }

  getCategories() {
     let allCategories = this.sessionStorageService.getCategories();

    if (allCategories == null || allCategories === undefined) {
      let baseRequest = { "requestModelType": "classifiedCategories" }
      this.classifiedService.getCategories(baseRequest).subscribe( response => {
        allCategories = response;
        this.sessionStorageService.setCategories(this.categories);
        this.categories = allCategories.filter(x => x.categoryParentId === "");
      })
    }
    else {
      this.categories = allCategories.filter(x => x.categoryParentId === "");
    }
  }

  getLocations() {
     let locations = this.sessionStorageService.getLocations();

    if (locations == null || locations === undefined) {
      let baseRequest = { "requestModelType": "locations" }
      this.supportService.getLocations(baseRequest).subscribe( response => {
        locations = response;
        this.sessionStorageService.setLocations(this.locations);
        this.locations = locations.filter(x => x.showFlag === true);
      })
    }
    else {
      this.locations = locations.filter(x => x.showFlag === true);
    }
  }

  search() {
    let searchParams = {};
    let searchParamsItems = [];

    //Search if both searchText and searchCategoryId == null
    if (this.searchModel.searchCategoryId === null && this.searchModel.searchText === null) {
      return;
    }

    //Search if searchText = null and searchCategoryId != null
    if (this.searchModel.searchCategoryId !== null) {
      searchParamsItems.push({ "name": "categoryId", "value": this.searchModel.searchCategoryId, "searchOrder": 1  });
    }

     //Search if searchText != null and searchCategoryId == null
     if (this.searchModel.searchText !== null) {
      searchParamsItems.push({ "name": "searchText", "value": this.searchModel.searchText, "searchOrder": 1  });
    }

    if (searchParamsItems !== null && searchParamsItems.length > 0) {
      let searchParams = { "searchParams": searchParamsItems };
      this.sessionStorageService.setSearchParams(searchParams);
      this.navigationService.navigateToSearchResults();
      
      // this.classifiedService.getListingsByParams(searchParams).subscribe(
      //   response => this.getOnSuccess(response),
      //   response => this.getOnError(response)
      // );   
    }
  }

  getOnSuccess(response: any): void {
    //this.listings = response;
    this.navigationService.navigateToSearchResults();
  }

  private getOnError(response: any): void {
    //TODO
  }
}
