import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { CategoriesComponent } from '../../components/categories/categories/categories.component';
import { HomeSearchComponent } from '../../components/search/home-search/home-search.component';
import { CategoryIconComponent } from '../../components/categories/category-icon/category-icon.component';
import { BusinessComponent } from '../../components/common/business/business.component';
import { TopAdsComponent } from '../../components/common/top-ads/top-ads.component';
import { TopBannerComponent } from '../../components/banners/top-banner/top-banner.component';

import { PortalModule } from '../../portal.module';

import { AppModule } from '../../../app.module';

import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';


import { ApplicationService } from '../../../shared/services/application.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { ClassifiedService } from '../../../shared/services/classified.service';

import { ICustomer } from '../../../shared/interfaces/customer.interface';
import { IProductType } from "../../../shared/interfaces/product-type.interface";
import { IListing } from '../../../shared/interfaces/listing.interface';
import { IBanner } from '../../../shared/interfaces/banner.interface';
import { IMessage } from '../../../shared/interfaces/message.interface';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [TranslateModule, CategoriesComponent, HomeSearchComponent, BusinessComponent, TopAdsComponent, CategoryIconComponent, TopBannerComponent],
  providers: [ApplicationService, NavigationService, SessionStorageService, CustomerService, ClassifiedService, TranslateService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
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