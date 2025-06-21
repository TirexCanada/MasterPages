import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { UpdatePasswordComponent } from '../../../components/update-password/update-password.component';

import { ICustomer } from '../../../../shared/interfaces/customer.interface';
import { IMessage } from "../../../../shared/interfaces/message.interface";

import { ApplicationService } from '../../../../../app/shared/services/application.service';
import { CustomerService } from '../../../../../app/shared/services/customer.service';
import { SessionStorageService } from '../../../../../app/shared/services/session-storage.service';
import { NavigationService } from '../../../../../app/shared/services/navigation.service';
import { AuthenticationService } from "../../../../shared/services/authentication.service";
import { ErrorMessageComponent } from '../../../components/shared/common/error-message/error-message.component'; 


@Component({
  selector: 'change-password',
  standalone: true, 
  imports: [CommonModule, TranslateModule,  FormsModule, UpdatePasswordComponent, ErrorMessageComponent],
  providers: [ApplicationService, AuthenticationService, NavigationService, SessionStorageService, CustomerService],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
  @Input() 
  
  currentCustomer: ICustomer;
  form: NgForm;
  submitted: boolean;
  model: any;
  serverErrors: IMessage [];
  isBackEnabled: boolean;
  mode: string;

  @ViewChild('updatePasswordForm', { static: true }) updatePasswordForm: NgForm;

  constructor(private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private sessionStorageService: SessionStorageService,
    private customerService: CustomerService) { 
      router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.activatedRoute.data.subscribe(data => {
            //this.currentCustomer = data.currentCustomer;
            this.currentCustomer = this.sessionStorageService.getCurrentCustomer();
            this.getCustomerData();
          });
        } 
    });
  }

  ngOnInit() {
    this.submitted = false;
    this.mode = "request";
    this.isBackEnabled = false;
    this.form = this.updatePasswordForm;
    this.model = { "oldPassword": { "password": "" }, "password": { "password": "" }, "confirmPassword": { "password": "" } };
  }

  onSubmitForm(response) { 
    this.serverErrors = response;
    this.isBackEnabled = true;
  }
  
  onSubmitFailed(response) {
    this.serverErrors = response;
  }

  onSubmitFormPassword(response) {
    this.mode = "message";
    this.serverErrors = response;
  }

  onCancelForm(e: any) {
    this.location.back();
  }

  backToPortal() {
    this.location.back();
  }

  getCustomerData() {
    let baseRequestModel = { "CustomerId": this.currentCustomer?.id}
    this.customerService.getCustomerListings(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );      
  }

  getOnSuccess(response: any): void {
    //this.listings = response.listings;
  }

  private getOnError(response: any): void {
    //TODO
  }
}