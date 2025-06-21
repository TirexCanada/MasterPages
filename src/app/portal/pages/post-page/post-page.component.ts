import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';  

import { ApplicationService } from '../../../../app/shared/services/application.service';
import { CustomerService } from '../../../../app/shared/services/customer.service';
import { SessionStorageService } from '../../../../app/shared/services/session-storage.service';
import { NavigationService } from '../../../../app/shared/services/navigation.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { AuthenticationService } from "../../../../app/shared/services/authentication.service";
import { DisableDirective } from '../../../../app/shared/directives/disable.directive';
import { AddPostComponent } from '../../components/add-post-components/add-post/add-post.component';
import { AddPostContactComponent } from '../../components/add-post-components/add-post-contact/add-post-contact.component';
import { AddPostImagesComponent } from '../../components/add-post-components/add-post-images/add-post-images.component';
import { AddPostMapComponent } from '../../components/add-post-components/add-post-map/add-post-map.component';
import { AddPostTagsComponent } from '../../components/add-post-components/add-post-tags/add-post-tags.component';
import { RadioInputQuestionComponent } from '../../components/generic-components/radio-input-question/radio-input-question.component';


import { ICustomer } from '../../../../app/shared/interfaces/customer.interface';
import { IListing } from '../../../../app/shared/interfaces/listing.interface';
import { IMessage } from '../../../../app/shared/interfaces/message.interface';
import { TRUE_FALSE } from '../../../../app/shared/constants/app-constants';
import { LISTING_TYPES } from '../../../../app/portal/constants/portal-constants';

@Component({
  selector: 'app-post-page',
  standalone: true, 
  providers: [ApplicationService, NavigationService, SessionStorageService, CustomerService, AuthenticationService],
  imports: [TranslateModule, CommonModule, AddPostComponent, FormsModule, DisableDirective, AddPostContactComponent, AddPostImagesComponent, AddPostMapComponent, AddPostTagsComponent, RadioInputQuestionComponent],
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  currentCustomer: ICustomer;
  model: IListing;
  newModel: any;
  orgModel: IListing;
  customerModel: any;
  validationData: any;
  form: NgForm;
  section: string;
  serverErrors: IMessage [];
  isDisabled: any;
  submitted: boolean = false;
  mode: string;
  listingId: string;
  listingTags: any [];
  newListingFlag: boolean;
  errorMessage: string = "";
  listingTypesOptionsData: any;
  isBusiness: string;
  listings: IListing[] = [];
 
  showNavigationButtons: boolean = false;

  destroyed = new Subject<any>();

  @ViewChild('postForm', { static: true }) postForm: NgForm;
  
  constructor( private location: Location,
    private activatedRoute: ActivatedRoute,
    private applicationService: ApplicationService,
    private navigationService: NavigationService,
    private customerService: CustomerService,
    private sessionStorageService: SessionStorageService) { 
      this.activatedRoute.queryParams.subscribe(params => {
        this.activatedRoute.params.subscribe(params => {
          this.listingId = params['listingid'];
          this.mode = params['mode']
        });
        this.currentCustomer = this.sessionStorageService.getCurrentCustomer();
        this.getCustomerData();
      });
    }

  ngOnInit(): void {
    this.listingTags = [];
    this.listingTypesOptionsData = LISTING_TYPES;

    switch(this.mode) {
      case "add":
        this.newModel = {"businessFlag": null};
        this.model = {
          "id": null,
          "customerId": this.currentCustomer.id,
          "title": null,
          "description": null,
          "listingTagsInformation": [],
          "businessFlag": null,
        };
        this.newListingFlag = true;
        this.isDisabled = { "listing": false, "tags": true, "images": true };
        break;
      case "edit":
        this.model = this.currentCustomer.customerListingsInformation.find(x => x.id === this.listingId);
        this.newModel = {"businessFlag": this.model.businessFlag};
        this.isDisabled = { "listing": true, "tags": true, "images": true };
        this.newListingFlag = false;
        break;
      case "delete":
        this.model = this.currentCustomer.customerListingsInformation.find(x => x.id === this.listingId);
        this.newModel = {"businessFlag": this.model.businessFlag};
        this.isDisabled = { "listing": true, "tags": true, "images": true };
        this.newListingFlag = false;
        break;
    }
  }

  getCurrentCustomer() {
    this.activatedRoute.data.subscribe(data => {
      this.currentCustomer = data["currentCustomer"];
    });
  }

  getCustomerData() {
    let baseRequestModel = { "CustomerId": this.currentCustomer.id}
    this.customerService.getCustomerListings(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );      
  }

  getOnSuccess(response: any): void {
    this.listings = response.listings;
  }

  private getOnError(response: any): void {
    //TODO
  }

  editClick(type: string) {
    this.isDisabled[type] = false;
  }

  saveClick(type: string) {
    this.submitted = true;
    this.errorMessage = "";
    let listing: any;

    if (this.validateForm(this.model, type)) {
      this.model.customerId = this.currentCustomer.id;
      listing = JSON.parse(JSON.stringify(this.model)); 
      listing.email = this.currentCustomer.email;

      if (this.newModel.businessFlag !== null && this.newModel.businessFlag !== undefined) {
        listing.businessFlag = this.newModel.businessFlag;
      }

      if (listing.phone === null || listing.phone === undefined) {
        listing.phone = this.currentCustomer.customerContactInformation?.phoneNumber;
      }

      if (listing.website === null || listing.website === undefined) {
        listing.website = this.currentCustomer.website;
      }
   
      if (type === "tags") {
        this.customerService.updateListingTags(listing.listingTagsInformation).pipe(
          takeUntil(this.destroyed)
        ).subscribe(
          response => this.updateListingTagsOnSuccess(response, type),
          response => this.updateListingOnError(response)
        );
      }
      else {
        this.customerService.updateListing(listing).pipe(
          takeUntil(this.destroyed)
        ).subscribe(
          response => this.updateListingOnSuccess(response, type),
          response => this.updateListingOnError(response)
        );
      }
    }
    /* else {
      this.errorMessage = "Please fill in all the required fields."
    } */
  }

  deleteClick(type: string) {
    this.submitted = true;
    this.errorMessage = "";
    let listing: any;
    
    this.customerService.deleteListing(listing).pipe(
      takeUntil(this.destroyed)
    ).subscribe(
      response => this.deleteOnSuccess(response),
      response => this.deleteOnError(response)
    );
  }
  
    
  cancelClick(type: string) {
    this.submitted = false;
    this.model = this.orgModel;
    this.isDisabled[type] = true;
    this.navigationService.navigateToMyListings();
  }

  
  private updateListingOnSuccess(response: any, type: string): void {
    this.listingId = response.id;
    this.model.id = response.id;
    this.submitted = false;
    this.newListingFlag = false;
    
    //this.sessionStorageService.setCurrentCustomer(response);


    this.isDisabled[type] = true;
    //this.serverErrors.push({ "isSuccess": true, "code": "1", "message": "", "displayMessage": "Your information had been updated successfully. Please, click the Back button below to return back to Your Personal Portal." });
  }

  private updateListingTagsOnSuccess(response: any, type: string): void {
    this.model.listingTagsInformation = response;


   /*  this.listingId = response.id;
    this.model.id = response.id;
    this.submitted = false;
    this.newListingFlag = false; */
    
    //this.sessionStorageService.setCurrentCustomer(response);


    this.isDisabled[type] = true;
    //this.serverErrors.push({ "isSuccess": true, "code": "1", "message": "", "displayMessage": "Your information had been updated successfully. Please, click the Back button below to return back to Your Personal Portal." });
  }
  
  private updateListingOnError(response: any): void {
    this.submitted = false;
    this.serverErrors = response; 
  }

  validateForm(model: IListing, type: string) {
    let validate = true;

    switch(type) {
      case "listing":
        this.errorMessage = "";

        if (model.title === null || model.title === undefined || model.title.trim() === "") {
          this.errorMessage = "Title and Listing details are the required fields. Please fill in all the required fields and try to Save again.";
          return false;
        }

        if (model.description === null || model.description === undefined || model.description.trim() === "") {
          this.errorMessage = "Title and Listing details are the required fields. Please fill in all the required fields and try to Save again.";
          return false;
        }
        break;
    }

    return validate;
  }

  saveStatus(activeFlag: boolean) {
    let listing = JSON.parse(JSON.stringify(this.model)); 
    listing.activeFlag = activeFlag;

    this.customerService.updateListingStatus(listing).pipe(
      takeUntil(this.destroyed)
    ).subscribe(
      response => this.updateListingStatusOnSuccess(response),
      response => this.updateListingStatusOnError(response)
    );
  }

  private updateListingStatusOnSuccess(response: any ): void {
    this.navigationService.navigateToMyListings();
  }
  
  private updateListingStatusOnError(response: any): void {
    this.serverErrors = response; 
  }

  private deleteOnSuccess(response: any ): void {
    this.navigationService.navigateToMyListings();
  }
  
  private deleteOnError(response: any): void {
    this.serverErrors = response; 
  }

  onSubmit() {
    
  }

  onSelectDirectory(isBusiness) {
    this.isBusiness = isBusiness;
  }
}
