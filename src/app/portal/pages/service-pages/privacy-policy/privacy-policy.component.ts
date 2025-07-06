import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { environment } from '../../../../../environments/environment';

import { CarouselBannerComponent } from '../../../components/banners/carousel-banner/carousel-banner.component';

import { HowItWorksComponent } from '../../../components/common/how-it-works/how-it-works.component';
import { AdsBoxComponent } from '../../../components/common/ads-box/ads-box.component';
import { ListYourAdComponent } from '../../../components/common/list-your-ad/list-your-ad.component';

import { PortalModule } from '../../../portal.module';

import { AppModule } from '../../../../app.module';

import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';


import { ApplicationService } from '../../../../shared/services/application.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { CustomerService } from '../../../../shared/services/customer.service';
import { ClassifiedService } from '../../../../shared/services/classified.service';

import { ICustomer } from '../../../../shared/interfaces/customer.interface';
import { IProductType } from "../../../../shared/interfaces/product-type.interface";
import { IListing } from '../../../../shared/interfaces/listing.interface';
import { IBanner } from '../../../../shared/interfaces/banner.interface';

@Component({
  selector: 'app-privacy-policy',
  standalone: true, 
  imports: [TranslateModule, CarouselBannerComponent, HowItWorksComponent, AdsBoxComponent, ListYourAdComponent],
  providers: [ApplicationService, NavigationService, SessionStorageService, CustomerService, ClassifiedService, TranslateService],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})

export class PrivacyPolicyComponent implements OnInit {
  checkoutUrl: any;
  pdfSrc: any;
  iframeSrc: any;
  currentCustomer!: ICustomer | null;
  welcomeTitle: string = "";
  productType!: IProductType;
  productTypes: IProductType [] = [];
  topListings: IListing[] | null = [];
  topPriorityListings: IListing[] | null = [];
  topActiveBanners: IBanner[] | null = [];

  currentLanguage: string = "en";
  private languageSubscription: Subscription;


  constructor(
    private classifiedService: ClassifiedService,
    private navigationService: NavigationService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {
    this.currentCustomer = this.sessionStorageService.getCurrentCustomer();
    this.topListings = this.sessionStorageService.getTopListings();
    this.topPriorityListings = this.sessionStorageService.getTopListings();
    this.topActiveBanners = this.sessionStorageService.getActiveBanners();

    let baseRequestModel = { "RequestModelType": "listings" };
    
    if (this.topListings === null || this.topListings === undefined) { 
      this.classifiedService.getTopListings(baseRequestModel).subscribe(
        response => this.getOnSuccess(response, "topListings"),
        response => this.getOnError(response)
      );   
    }

    if (this.topListings === null || this.topListings === undefined) {
      this.classifiedService.getTopPriorityListings(baseRequestModel).subscribe(
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
      this.sessionStorageService.setTopListings(this.topListings);

    }
    else if (type === "topPriorityListings"){
      this.topPriorityListings = response;
      this.topPriorityListings?.map( x => {
        x.listingId = x.id;
      })
      this.sessionStorageService.setTopPriorityListings(this.topPriorityListings);
    }
  }

  private getOnError(response: any): void {
    //TODO
  }
}