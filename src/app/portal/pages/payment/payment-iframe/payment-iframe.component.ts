import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';

import { ApplicationService } from 'src/app/shared/services/application.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';

import { ICustomer } from 'src/app/shared/interfaces/customer.interface';

@Component({
  selector: 'app-payment-iframe',
  templateUrl: './payment-iframe.component.html',
  styleUrls: ['./payment-iframe.component.css']
})
export class PaymentIframeComponent implements OnInit {

  customer: ICustomer;
  paymentStep: string;
  params: any;
  bamboraUrl: SafeResourceUrl;
  lob: string;

  constructor(public router: Router,
    public applicationService: ApplicationService,
    private navigationService: NavigationService,
    private sessionStorageService: SessionStorageService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer) { 
      this.params = this.activatedRoute.params.subscribe(params => this.paymentStep = params['code']);
      this.applicationService.setCurrentLob(this.lob);
    }

 
  ngOnInit() {
    if (this.paymentStep === null || this.paymentStep === undefined) {
      this.paymentStep = "payment";
     
      //let amount = this.shoppingCart.total.toString();
    }
  }
 

  goBack() {
    this.navigationService.navigateToReviewOrder(this.lob);
  }

  isSubmitted() {
    return true;
  }
}