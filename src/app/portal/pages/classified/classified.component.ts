import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  

import { TopAdsComponent } from '../../components/common/top-ads/top-ads.component';
import { ApplicationService } from '../../../shared/services/application.service';
import { ClassifiedService } from '../../../shared/services/classified.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { RegistrationService } from '../../../shared/services/registration.service';
import { SearchMainComponent } from '../../components/search/search-main/search-main.component';
import { CategoryIconComponent } from '../../components/categories/category-icon/category-icon.component';
import { HomeSearchComponent } from '../../components/search/home-search/home-search.component';
import { IListing } from '../../../shared/interfaces/listing.interface';
import { ICustomer } from '../../../shared/interfaces/customer.interface';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [SearchMainComponent, CategoryIconComponent, HomeSearchComponent, CommonModule, TranslateModule, TopAdsComponent],
  providers: [ApplicationService, ClassifiedService, AuthenticationService, NavigationService, CustomerService, RegistrationService, SessionStorageService, CommonModule],
  templateUrl: './classified.component.html',
  styleUrls: ['./classified.component.scss'],
})

export class ClassifiedComponent implements OnInit {
  checkoutUrl: any;
  pdfSrc: any;
  iframeSrc: any;
  currentCustomer!: ICustomer | null;
  welcomeTitle: string = "";
  // productType!: IProductType;
  // productTypes: IProductType [] = [];
  topListings: IListing[] | null = [];
  topPriorityListings: IListing[] | null = [];
  //topActiveBanners: IBanner[] | null = [];

  currentLanguage: string = "en";
  //private languageSubscription: Subscription;
  listings: IListing [];
  tagId: string;
  categoryType: string;

 constructor(private router: Router,
     private applicationService: ApplicationService,
     private classifiedService: ClassifiedService,
     private authenticationService: AuthenticationService,
     private navigationService: NavigationService,
     private customerService: CustomerService,
     private registrationService: RegistrationService,
     private sessionStorageService: SessionStorageService,
     public translateService: TranslateService,
     private activatedRoute: ActivatedRoute) { 
       this.activatedRoute.params.subscribe(params => {
         this.tagId = params['tagid'];
         this.categoryType = params['categorytype'];
         let baseRequestModel = { "tagId": this.tagId };
        //  this.classifiedService.getListingsByTagId(baseRequestModel).subscribe(
        //    response => this.getOnSuccess(response),
        //    response => this.getOnError(response)
        //  );   
       });
   }

  ngOnInit() {
    this.currentCustomer = this.sessionStorageService.getCurrentCustomer();
    this.topListings = this.sessionStorageService.getTopClassifiedListings();
    this.topPriorityListings = this.sessionStorageService.getTopClassifiedListings();
    //this.topActiveBanners = this.sessionStorageService.getActiveBanners();

    let baseRequestModel = { "RequestModelType": "listings" };
    
    if (this.topListings === null || this.topListings === undefined) { 
      this.classifiedService.getTopClassifiedListings(baseRequestModel).subscribe(
        response => this.getOnSuccess(response, "topListings"),
        response => this.getOnError(response)
      );   
    }

    if (this.topPriorityListings === null || this.topPriorityListings === undefined) {
      this.classifiedService.getTopClassifiedPriorityListings(baseRequestModel).subscribe(
        response => this.getOnSuccess(response, "topPriorityListings"),
        response => this.getOnError(response)
      );      
    }
  }

  getOnSuccess(response: any, type: any): void {
    if (type === "topListings"){
      this.topListings = response;
      this.topListings?.map( x => {
        x.listingId = x.id;
      })
      this.sessionStorageService.setTopClassifiedListings(this.topListings);

    }
    else if (type === "topPriorityListings"){
      this.topPriorityListings = response;
      this.topPriorityListings?.map( x => {
        x.listingId = x.id;
      })
      this.sessionStorageService.setTopClassifiedPriorityListings(this.topPriorityListings);
    }
  }

  private getOnError(response: any): void {
    //TODO
  }
}