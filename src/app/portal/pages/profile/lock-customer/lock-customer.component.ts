import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { NavigationService } from "src/app/shared/services/navigation.service";

import { ICustomer } from 'src/app/shared/interfaces/customer.interface';
import { IMessage } from 'src/app/shared/interfaces/message.interface';

@Component({
  selector: 'lock-customer',
  templateUrl: './lock-customer.component.html',
  styleUrls: ['./lock-customer.component.css']
})

export class LockCustomerComponent implements OnInit {
  currentCustomer: ICustomer;
  submitted: boolean;
  serverErrors: IMessage [];
  isBackEnabled: boolean;
  token: string;
  mode: string;

  constructor(private location: Location,
    private navigationService: NavigationService){
  
  }

  ngOnInit() {
    this.submitted = false;
    this.isBackEnabled = false;
    this.mode="request";
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
    //this.mode = "result";
    //this.model = { "customerId": response.customerId, "oldPassword": { "password": "" }, "password": { "password": "" }, "confirmPassword": { "password": "" } };

    this.mode = "message";
    this.serverErrors = response;
   }

  onCancelForm() {
    this.location.back();
  }

  backToPortal() {
    //this.navigationService.navigateToPackageCurrentStatus();
  }
}