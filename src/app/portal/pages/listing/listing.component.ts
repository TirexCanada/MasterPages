import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { DateFormatLongPipe } from '../../../shared/pipes/date-format-long.pipe';
import { GoogleMapsModule } from '@angular/google-maps'

import { ApplicationService } from '../../../shared/services/application.service';
import { ClassifiedService } from '../../../shared/services/classified.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { RegistrationService } from '../../../shared/services/registration.service';
import { ErrorMessageComponent } from '../../components/shared/common/error-message/error-message.component'; 
import { ListingMainComponent } from '../../components/common/listings/listing-main/listing-main.component';
import { ListingContactInfoComponent } from '../../components/common/listings/listing-contact-info/listing-contact-info.component';
import { ListingContactFormComponent } from '../../components/common/listings/listing-contact-form/listing-contact-form.component';
import { MapComponent } from '../../components/common/map/map.component';
import { ListingTagsComponent } from '../../components/tags/listing-tags/listing-tags.component';
import { IListing } from '../../../shared/interfaces/listing.interface';


@Component({
  selector: 'app-listing',
  standalone: true, 
  imports: [CommonModule, TranslateModule, FormsModule, ErrorMessageComponent, ListingComponent, ListingMainComponent, NgbPopover, ListingContactInfoComponent, ListingTagsComponent, MapComponent, GoogleMapsModule, ListingContactFormComponent],
  providers: [ApplicationService, AuthenticationService, NavigationService, SessionStorageService, CustomerService, DateFormatPipe, DateFormatLongPipe, RegistrationService],
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  listingId: string;
  listing: IListing;

  tags: any[];
  listingTags: any[];

  mapLocation: any;
  lat: any;
  lng: any;
 
  constructor(private router: Router,
    private applicationService: ApplicationService,
    private classifiedService: ClassifiedService,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private customerService: CustomerService,
    private registrationService: RegistrationService,
    private sessionStorageService: SessionStorageService,
    private activatedRoute: ActivatedRoute) { 
      this.activatedRoute.params.subscribe(params => {
        this.listingId = params['listingid'];
      });
    }

  ngOnInit(): void {
    let baseRequestModel = { "Id": this.listingId };
    this.classifiedService.getListing(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );   
  }

 
  getOnSuccess(response: any): void {
    this.listing = response;
    this.getAddress(this.listing);

    // //Update Hits
    // let baseRequestModel = { "Id": this.listingId };
    // this.classifiedService.updateListingHits(baseRequestModel).subscribe(
    //   response => this.updateOnSuccess(response),
    //   response => this.updateOnError(response)
    // );   
  }

  private getOnError(response: any): void {
    //TODO
  }

  getAddress(listing) {
    let address = "";

    if (this.listing.customerContactInformation?.postalCode !== null && this.listing.customerContactInformation?.postalCode !== undefined) {
      address = this.listing.postalCode + 
      ((this.listing.customerContactInformation?.province) ? (', ' + this.listing.customerContactInformation?.province) : "") +
      ((this.listing.customerContactInformation?.country) ? (', ' + this.listing.customerContactInformation?.country) : "");
    }
    else {
      address = ((this.listing.customerContactInformation?.addressLine1) ? this.listing.customerContactInformation?.addressLine1 : "") +
      ((this.listing.customerContactInformation?.addressLine2) ? ', ' + this.listing.customerContactInformation?.addressLine2 : "") +
      ((this.listing.customerContactInformation?.city) ? (', ' + this.listing.customerContactInformation?.city) : "") +
      ((this.listing.customerContactInformation?.province) ? (', ' + this.listing.customerContactInformation?.province) : "") +
      ((this.listing.customerContactInformation?.country) ? (', ' + this.listing.customerContactInformation?.country) : "");
    }
    this.getCoordinates(address);
  }

  getCoordinates(address){
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+address+'&key='+'AIzaSyD-rAjxa7xV_3qcvhbWM8VdOTxUsyvsFkg')
      .then(response => response.json())
      .then(data => {
        let lat = data.results[0].geometry.location.lat;
        let lng = data.results[0].geometry.location.lng;
        this.mapLocation = { "lat": lat, "lng": lng };
      })
  }

  getPostalCode() {
    if (this.listing.postalCode !== null && this.listing.postalCode !== undefined) {
      //this.listing.postalCode = this.currentCustomer.customerContactInformation?.postalCode;
      let address = this.listing.postalCode + ",ONTARIO,CANADA";
      this.getCoordinates(address);
    }
  }

  updateOnSuccess(response: any): void {
   //TODO
  }

  private updateOnError(response: any): void {
    //TODO
  }
}
