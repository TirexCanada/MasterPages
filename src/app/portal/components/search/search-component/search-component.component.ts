import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { ClassifiedService } from '../../../../shared/services/classified.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

import { ICategory } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-search-component',
  imports: [TranslateModule],
  standalone: true,
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  searchModel: any;
  sortByOptionsData: any [];
  categories: ICategory [];

  @Output() submitSearch: EventEmitter<any> = new EventEmitter<any>();
  
  @ViewChild('form', { static: true }) form: NgForm;

  constructor(private sessionStorageService: SessionStorageService,
    private classifiedService: ClassifiedService) { }

  ngOnInit(): void {
   /*  this.searchModel = { "id": 0 };
    this.sortByOptionsData = [{ "code": "0: Latest", "text": "Latest" }] */

    this.searchModel = { "searchCategoryId": null, "searchText": null };
   
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

  selectSortBy() {
    
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

    if (searchParamsItems !== null && searchParamsItems.length > 0) {
      let searchParams = { "searchParams": searchParamsItems };
      
      this.classifiedService.getListingsByParams(searchParams).subscribe(
        response => this.getOnSuccess(response),
        response => this.getOnError(response)
      );   
    }
  }

  getOnSuccess(response: any): void {
    this.submitSearch.emit(response);
  }

  private getOnError(response: any): void {
    //TODO
  }
}
