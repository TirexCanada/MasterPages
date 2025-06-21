import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  

import { ApplicationService } from '../../../../../app/shared/services/application.service';
import { CustomerService } from '../../../../../app/shared/services/customer.service';
import { SessionStorageService } from '../../../../../app/shared/services/session-storage.service';
import { ClassifiedService } from '../../../../../app/shared/services/classified.service';
import { AuthenticationService } from "../../../../shared/services/authentication.service";
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { MultiLineQuestionComponent } from '../../../components/generic-components/multi-line-question/multi-line-question.component';
import { OneLineQuestionComponent } from '../../../components/generic-components/one-line-question/one-line-question.component';
import { DropdownQuestionComponent } from '../../../components/generic-components/dropdown-question/dropdown-question.component';
import { TagsInputComponent } from '../../../components/tags/tags-input/tags-input.component';

import { ICustomer } from '../../../../../app/shared/interfaces/customer.interface';
import { IListing } from '../../../../../app/shared/interfaces/listing.interface';
import { IMessage } from '../../../../../app/shared/interfaces/message.interface';
import { ICategory } from '../../../../../app/shared/interfaces/category.interface';
import { ITag } from '../../../../../app/shared/interfaces/tag.interface';
import { IListingTag } from '../../../../../app/shared/interfaces/listing-tag.interface';

@Component({
  selector: 'app-add-post-tags',
  standalone: true, 
  imports: [FormsModule, CommonModule, TranslateModule, MultiLineQuestionComponent, OneLineQuestionComponent, DropdownQuestionComponent, TagsInputComponent],
  templateUrl: './add-post-tags.component.html',
  styleUrls: ['./add-post-tags.component.css']
})
export class AddPostTagsComponent implements OnInit, OnChanges {
  @Input() currentCustomer: ICustomer;
  @Input() model: IListing;
  @Input() mode: string;
  @Input() form: NgForm;
  @Input() submitted: boolean;
  @Input() listingTags: any [];
  @Input() businessFlag: boolean;

  orgModel: ICustomer;
  customerModel: any;
  validationData: any;
  section: string;
  serverErrors: IMessage [];
  showNavigationButtons: boolean = false;
  selectedCategory: any;
  categories: any [];
  subcategories: any [];
  tagModel: any;
  tagModel1: any;
  tags: any [];

  constructor(private sessionStorageService: SessionStorageService,
    private classifiedService: ClassifiedService) { }

  ngOnInit(): void {
    this.categories = this.sessionStorageService.getCategories();
    this.categories.map(x => {
      x.textRu = x.categoryName_RU;
    })

    if (this.businessFlag === true) {
      this.categories = this.categories?.filter(x => x.businessFlag  === true);
    }
    else if (this.businessFlag === false){
      this.categories = this.categories?.filter(x => x.classifiedFlag  === true);
    }

    this.tags = this.sessionStorageService.getTags();
    this.tagModel = { "id": null };
    this.tagModel1 = { "id": null };
  }

  ngOnChanges(): void {
    this.categories = this.sessionStorageService.getCategories();
    this.categories.map(x => {
      x.textRu = x.categoryName_RU;
    })

    if (this.businessFlag === true) {
      this.categories = this.categories?.filter(x => x.businessFlag  === true);
    }
    else if (this.businessFlag === false){
      this.categories = this.categories?.filter(x => x.classifiedFlag  === true);
    }

    //Get ListingTags
    this.listingTags = this.model?.listingTagsInformation;
    if (this.listingTags === null || this.listingTags === undefined) {
      this.listingTags = [];
    }
    else {
      this.mapListingTags();
    }
  }

  selectCategory() {
    let listingTag = { "listingId": (this.model?.id !== null && this.model?.id !== undefined)? this.model?.id : null, "tagId": this.tagModel?.id };
    if (listingTag.tagId !== null) {
      this.listingTags.push(listingTag);
      this.mapListingTags();
    }

    let selectedCategory = this.categories.find(x => x.id === this.tagModel.id);
    this.subcategories = selectedCategory.subcategoriesInformation;
    this.subcategories.map(x => {
      x.textRu = x.categoryName_RU;
    })

    if (this.businessFlag === true) {
      this.subcategories = this.subcategories.filter(x => x.businessFlag === true);
    }
    else if (this.businessFlag === false) {
      this.subcategories = this.subcategories.filter(x => x.classifiedFlag === true);
    }
   
    this.model.listingTagsInformation = this.listingTags;
    this.tagModel1 = { "id": null };
  }

  selectSubcategory() {
    let listingTag = { "listingId": (this.model.id !== null && this.model.id !== undefined)? this.model.id : null, "tagId": this.tagModel1.id };
    if (listingTag.tagId !== null) {
      this.listingTags.push(listingTag);
      this.mapListingTags();
    }
  }

  mapListingTags() {
     this.listingTags.map(x => {
       let tag = this.tags.find(t => t.id === x.tagId);
       x.tagName = tag.tagName;
       x.tagName_RU = tag.tagName_RU;
       x.sortOrder = tag.sortOrder;
     })
 
     this.listingTags = _.sortBy(this.listingTags, "sortOrder");
   }

   onTagAdded(event) {

   }

   onTagDeleted(listingTags: IListingTag []) {
    this.model.listingTagsInformation = listingTags;
   }
}
