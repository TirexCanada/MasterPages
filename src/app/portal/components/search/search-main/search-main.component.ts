import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { SearchCategoriesComponent } from '../search-categories/search-categories.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { SearchLocationComponent } from '../search-location/search-location.component';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { IListing } from '../../../../shared/interfaces/listing.interface';
import { CommonModule } from '@angular/common';
import { ClassifiedService } from '../../../../shared/services/classified.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-search-main',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchCategoriesComponent, SearchResultsComponent, SearchLocationComponent],
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.css']
})
export class SearchMainComponent implements OnInit, OnChanges {

  @Input() tagId: any;
  @Input() listings: any[]; //IListing;
  @Input() categoryType: string;

  constructor(private classifiedService: ClassifiedService) { }

  ngOnInit(): void {
    this.listings = this.listings;
    this.tagId = this.tagId;
  }

  ngOnChanges(): void {
    this.listings = this.listings;
    this.tagId = this.tagId;
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
  }

  private getOnError(response: any): void {
    //TODO
  }
}
