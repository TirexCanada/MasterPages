import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms'; 
import { Location } from '@angular/common';

import { ApplicationService } from '../../../../shared/services/application.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { CustomerService } from '../../../../shared/services/customer.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { RequestValidationCodeComponent } from '../../../../portal/components/request-validation-code/request-validation-code.component';
import { ErrorMessageComponent } from '../../../../portal/components/shared/common/error-message/error-message.component';
import { ICustomer } from '../../../../shared/interfaces/customer.interface';
import { IMessage } from '../../../../shared/interfaces/message.interface';
import { UpdatePasswordComponent } from '../../../components/update-password/update-password.component';

@Component({
  selector: 'forgot-password',
  standalone: true, 
  providers: [ApplicationService, AuthenticationService, SessionStorageService, CustomerService],
  imports: [TranslateModule, CommonModule, RequestValidationCodeComponent, ErrorMessageComponent, FormsModule, UpdatePasswordComponent],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  currentCustomer: ICustomer;
  submitted: boolean;
  model: any;
  requestModel: any = { "email": '', "verificationCode": '' };
  serverErrors: IMessage [];
  isBackEnabled: boolean;
  token: string;
  mode: string;

  @ViewChild('passwordForm', { static: true }) form: NgForm;

  constructor(private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
  ) {
  }

  ngOnInit() {
    this.submitted = false;
    this.mode = "request";
    this.isBackEnabled = false;
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
    this.serverErrors = response?.error;
  }

  onSubmitFormCode(response) {
   this.mode = "result";
   this.model = { "customerId": response.customerId, "oldPassword": { "password": "" }, "password": { "password": "" }, "confirmPassword": { "password": "" } };
   this.requestModel = { "email": '', "verificationCode": '' };
  }


  onSubmitFormPassword(response) {
    this.mode = "message";
    this.serverErrors = response;
  }

  onCancelForm(event: any) {
    this.location.back();
  }

  backToPortal() {
    this.location.back();
  }

  onSubmit() {
    
  }
}