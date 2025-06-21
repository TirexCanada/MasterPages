import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';

import { ApplicationService } from 'src/app/shared/services/application.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';

import { ICustomer } from 'src/app/shared/interfaces/customer.interface';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  customer: ICustomer;
  paymentStep: string;
  params: any;
  bamboraUrl: SafeResourceUrl;
  lob: string;
  paymentStatus: string;

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
    }

    this.paymentStatus = "failure";
  }
 

  goBack() {
    this.navigationService.navigateToReviewOrder(this.lob);
  }

  isSubmitted() {
    return true;
  }

  getPaymentStatus() {
    this.paymentStatus = this.sessionStorageService.getPaymentStatus();
  }

  goToPaymentSuccess() {
    this.paymentStatus = "success";
  }

  goToPaymentFailure() {
    this.paymentStatus = "failure";
  }

  backToMyListings() {
    this.navigationService.navigateToMyListings();
  }

  onIframeReload() {
    setTimeout(function() {
      this.paymentStatus = this.sessionStorageService.getPaymentStatus();
    }, 3000);
  }
}