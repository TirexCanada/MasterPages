import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { UpdatePasswordComponent } from '../../../components/update-password/update-password.component';
import { ListingComponent } from '../../listing/listing.component';
import { ListingBlockComponent } from '../../../components/common/listings/listing-block/listing-block.component';

import { ApplicationService } from '../../../../shared/services/application.service';
import { CustomerService } from '../../../../shared/services/customer.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { AuthenticationService } from "../../../../shared/services/authentication.service";
import { ErrorMessageComponent } from '../../../components/shared/common/error-message/error-message.component'; 
import { DateFormatLongPipe } from '../../../../shared/pipes/date-format-long.pipe';

import { ICustomer } from '../../../../shared/interfaces/customer.interface';
import { IListing } from '../../../../shared/interfaces/listing.interface';
import { IMessage } from '../../../../shared/interfaces/message.interface';


@Component({
  selector: 'app-my-listings',
  standalone: true, 
  imports: [CommonModule, TranslateModule,  FormsModule, UpdatePasswordComponent, ErrorMessageComponent, ListingComponent, ListingBlockComponent, DateFormatLongPipe],
  providers: [ApplicationService, AuthenticationService, NavigationService, SessionStorageService, CustomerService],
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.css']
})
export class MyListingsComponent implements OnInit {
  listings: IListing [];
  currentCustomer: ICustomer;

  model: ICustomer;
  orgModel: ICustomer;
  customerModel: any;
  validationData: any;
  form: NgForm;
  section: string;
  defaultCountry: string;
  serverErrors: IMessage [];
  isDisabled: boolean = true;
  submitted: boolean = false;
  errorMessage: string = "";
  webApiUrl: string;
  listingImageUrl: string;

  showNavigationButtons: boolean = false;

  destroyed = new Subject<any>();
  
  @HostListener('error')
  onError() {
    this.listingImageUrl = "/assets/images/listings/default_r.png";
  }


  constructor( private location: Location,
    private activatedRoute: ActivatedRoute,
    private applicationService: ApplicationService,
    private navigationService: NavigationService,
    private customerService: CustomerService,
    private sessionStorageService: SessionStorageService) { 
      this.activatedRoute.queryParams.subscribe(params => {
        this.currentCustomer = this.sessionStorageService.getCurrentCustomer();
        this.getCustomerData();
        this.webApiUrl = environment.baseUrl;
      });
    }


  ngOnInit(): void {
    this.validationData = this.applicationService.getValidationData();
    //this.form = this.profileForm;
    this.section = "profile";
    this.defaultCountry = "Canada";
    this.model = JSON.parse(JSON.stringify(this.currentCustomer));
    this.webApiUrl = environment.baseUrl;
  }

  getCustomerData() {
    let baseRequestModel = { "CustomerId": this.currentCustomer.id}
    this.customerService.getCustomerListings(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );      
  }

  getOnSuccess(response: any): void {
    this.currentCustomer.customerListingsInformation = response;
    this.sessionStorageService.setCurrentCustomer(this.currentCustomer);
    
    this.listings = response;
    this.listings.map( x=> {
      x.categoryType = (x.businessFlag !== true)? "classified" : "business";
      let listingImageUrl = this.webApiUrl + x.listingImageUrl;
      if (this.isFileExist(listingImageUrl) === false) {
        x.listingImageUrl = this.listingImageUrl; 
      }
      else {
        x.listingImageUrl = listingImageUrl; 
      }
    })
  }

  private getOnError(response: any): void {
    //TODO
  }

  addPost() {
    this.navigationService.navigateToAddPost();
  }

  editClick(listing) {
    this.navigationService.navigateToEditPost(listing.id);
  }

  deleteClick(listing) {
    this.navigationService.navigateToDeletePost(listing.id);
  }

  boostClick(listing) {
    this.navigationService.navigateToBoostPage(listing.id);
  }

  changeStatusClick(listing, activeFlag) {
    let updatedListing = JSON.parse(JSON.stringify(listing));
    updatedListing.activeFlag = activeFlag;
    this.customerService.updateListingStatus(updatedListing).pipe(
        takeUntil(this.destroyed)
      ).subscribe(
        response => this.updateListingOnSuccess(response, activeFlag),
        response => this.updateListingOnError(response)
      );
  }

  private updateListingOnSuccess(response: any, activeFlag): void {
    let listing = response;
    this.listings.map (x => {
      if (x.id === listing.id) {
        x.activeFlag = activeFlag;
      }
    })
  }

  private updateListingOnError(response: any): void {
    this.serverErrors = response;
    //this.submitForm.emit(this.serverErrors);
  }

  isFileExist(urlToFile)
  {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if(xhr.status != 200) {
      return false;
    }
    else {
      return true;
    }
  }
}
