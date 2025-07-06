import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModalModule, NgbCollapseModule, NgbModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router'; 
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { LoggedCustomerComponent } from '../../login/logged-customer/logged-customer.component';
import * as _ from 'lodash';
import { environment } from '../../../../../environments/environment';

import { ApplicationService } from '../../../../shared/services/application.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { CustomerService } from '../../../../shared/services/customer.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';

import { ICustomer } from '../../../../shared/interfaces/customer.interface';
import { IContent } from '../../../../shared/interfaces/content.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, NgbModalModule, NgbCollapseModule, NgbDropdownModule, LoggedCustomerComponent],
  providers: [AuthenticationService, CustomerService, SessionStorageService, NavigationService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() shoppingCartClicked: EventEmitter<any> = new EventEmitter<any>();

  shoppingCartHeaderClicked: boolean = false;

  modalReference: any;

  loggedInfo: any;
  currentCustomer: ICustomer;

  isCustomerLoggedIn: boolean;
  isCustomerNotLoggedIn: boolean;
  loggedCustomerName: string;
  contentList: IContent [];

  shoppingCartCount: number;
  lob: string;
  isNavbarCollapsed: boolean;
  selectedLanguage: string = "EN";
  activeFlag: any = { "home": false, "category": false, "articles": false, "help": false, "contact": false };


  @ViewChild('shoppingCartModal') shoppingCartModal: any;

  constructor(private router: Router,
    private modalService: NgbModal,
    private applicationService: ApplicationService,
    private authenticationService: AuthenticationService,
    private customerService: CustomerService,
    private sessionStorageService: SessionStorageService,
    private navigationService: NavigationService) { 
      router.events.subscribe(val => {
        if (val instanceof NavigationEnd) {
          this.currentCustomer = this.authenticationService.getLoggedCustomer();
          this.isCustomerLoggedIn = (this.currentCustomer !== null);
          this.loggedCustomerName = this.customerService.getCustomerFullName(this.currentCustomer); 
          this.getActiveFlag(router.url);
          
          setTimeout(() => {
            this.contentList = this.sessionStorageService.getContentList();
            this.contentList = _.orderBy(this.contentList, "sortOrder");
          }, 1000);
        }
      });
  }

  ngOnInit() {
    this.isNavbarCollapsed = false;
  }

  goToLogin() {
    this.navigationService.navigateToLogin();
  }

  goToRegistration() {
    this.navigationService.navigateToRegistration();
  }

  onToggleClick() {
    //console.log('Dropdown toggle clicked');
  }
  

  

  onShoppingCartClicked(){
    this.modalReference = this.modalService.open(this.shoppingCartModal, { size: 'lg' });
    this.shoppingCartHeaderClicked = true;
  } 

  setLanguage(lang) {
    this.applicationService.setApplicationLanguage(lang);
    this.selectedLanguage = lang;
  }

  onCloseModal() {
    this.modalReference.close();
  } 

  addPost() {
    if (this.currentCustomer === null) {
      this.navigationService.navigateToLoginRegistration();
    }
    else {
      this.navigationService.navigateToAddPost();
    }
  }

  getActiveFlag(url: string) {
    if (url.indexOf("home") > -1) {
      this.activeFlag = { "home": true, "classified": false, "articles": false, "contact": false, "help": false };
    }
    else if (url.indexOf("classified") > -1) {
      this.activeFlag = { "home": false, "classified": true, "articles": false, "contact": false, "help": false };
    }
    else if (url.indexOf("articles") > -1) {
      this.activeFlag = { "home": false, "classified": false, "articles": true, "contact": false, "help": false };
    }
    else if (url.indexOf("contact") > -1) {
      this.activeFlag = { "home": false, "classified": false, "articles": false, "contact": true, "help": false };
    }
    else if (url.indexOf("help") > -1) {
      this.activeFlag = { "home": false, "classified": false, "articles": false, "contact": true, "help": true };
    }
  }

  langToggle(lang) {
    if (lang === 'en') {
      this.applicationService.setApplicationLanguage('en');
    }
    else if (lang === 'ru') {
      this.applicationService.setApplicationLanguage('ru');
    } 
  }

  
  logout() {
    this.authenticationService.logout();
    this.navigationService.navigateToHomePage();
  }
}