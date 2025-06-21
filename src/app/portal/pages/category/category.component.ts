import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

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
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';


@Component({
  selector: 'app-category',
  standalone: true, 
  imports: [SearchMainComponent, CategoryIconComponent, HomeSearchComponent, CommonModule, TranslateModule],
  providers: [ApplicationService, ClassifiedService, AuthenticationService, NavigationService, CustomerService, RegistrationService, SessionStorageService, CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
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
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute) { 
      this.activatedRoute.params.subscribe(params => {
        this.tagId = params['tagid'];
        this.categoryType = params['categorytype'];
        let baseRequestModel = { "requestModelType": this.categoryType, "tagId": this.tagId };
        this.classifiedService.getListingsByTagId(baseRequestModel).subscribe(
          response => this.getOnSuccess(response),
          response => this.getOnError(response)
        );   
      });
  }

  ngOnInit(): void {
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