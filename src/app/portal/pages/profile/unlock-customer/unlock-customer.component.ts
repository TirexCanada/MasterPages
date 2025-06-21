
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd} from '@angular/router';

import { ApplicationService } from 'src/app/shared/services/application.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';

import { ICustomer } from 'src/app/shared/interfaces/customer.interface';
import { IMessage } from 'src/app/shared/interfaces/message.interface';

@Component({
  selector: 'app-unlock-customer',
  templateUrl: './unlock-customer.component.html',
  styleUrls: ['./unlock-customer.component.css']
})

export class UnlockCustomerComponent implements OnInit {
  currentCustomer: ICustomer;
  submitted: boolean;
  model: any;
  serverErrors: IMessage [];
  isBackEnabled: boolean;
  token: string;
  mode: string;
  validationData: any;

  @ViewChild('form', { static: true }) form: NgForm;

  constructor(private location: Location,
    private router: Router,
    private applicationService: ApplicationService,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute) { 
      router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.activatedRoute.data.subscribe(data => {
            this.currentCustomer = data.currentCustomer;
          });
          this.activatedRoute.queryParams.subscribe(params => {
            this.token = params['token'];
          });
        } 
    });
  }

  ngOnInit() {
    this.validationData = this.applicationService.getValidationData();
    this.submitted = false;
    this.isBackEnabled = false;
    this.model = { "email": "" };
    this.mode = "request";
  }

  onSubmitForm(response) {
    if (this.mode === "request") {
      this.serverErrors = response;
    }
    else if (this.mode === "code") {
      this.submitted = false;
      this.serverErrors = [];
    }
  }
  
  onSubmitFailed(response) {
    this.serverErrors = response;
  }

  onSubmitFormCode(response) {
    this.mode = "result";
    this.model = { "customerId": response.customerId, "oldPassword": { "password": "" }, "password": { "password": "" }, "confirmPassword": { "password": "" } };
    let model = { "id": response.customerId };
   
    this.authenticationService.unlockCustomer(model).subscribe(
      response => this.onSuccess(response),
      response => this.onError(response)
    )
  }

  onSubmitFormPassword(response) {
    this.mode = "message";
    this.serverErrors = response;
  }
  
  onCancelForm() {
    this.location.back();
  }

  backToPortal() {
    this.location.back();
  }

  submitCode() {
    this.navigationService.navigateToChangePassword();

    if (this.model.verificationCode !== '') {
      this.authenticationService.unlockCustomer(this.model).subscribe(
        response => this.onSuccess(response),
        response => this.onError(response)
      )
    };
  }

  private onSuccess(response: any ): void {
    //this.model = { "customerId": response.customerId, "oldPassword": { "password": "" }, "password": { "password": "" }, "confirmPassword": { "password": "" } };

    //this.mode = "unlocked";

    //this.navigationService.navigateToChangePassword();

    /* this.sessionStorageService.setAuthHeader(response.jwtToken);     
    this.sessionStorageService.setCurrentCustomer(response); 
    
    this.customerService.buildCustomerCurrentStatus(response);
    this.loggedIn.emit(response); */
  }

  private onError(response: any): void {
   
  }

  onSubmit(): Promise<any> | boolean {
    this.submitted = true;
    return false;
  }
}