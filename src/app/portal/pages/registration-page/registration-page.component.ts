import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router, ActivatedRoute } from '@angular/router';

import { ApplicationService } from '../../../shared/services/application.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { RegistrationService } from '../../../shared/services/registration.service';
import { ClassifiedService } from '../../../shared/services/classified.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { RegistrationComponent } from '../../../portal/components/registration/registration.component';

import { ICustomerRegistration } from "../../../shared/interfaces/customer-registration.interface";
import { IMessage } from "../../../shared/interfaces/message.interface";
import { ILogin } from "../../../shared/interfaces/login.interface";

import { APPLICATION_ROUTES } from '../../../shared/constants/app-constants';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-registration-page',
  standalone: true, 
  imports: [TranslateModule,  FormsModule, RegistrationComponent],
  providers: [ApplicationService, AuthenticationService, NavigationService, RegistrationService, SessionStorageService, CustomerService, ClassifiedService],
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  @ViewChild('registrationForm', { static: true }) registrationForm: NgForm;

  
  params: any;
  config: any;
  globalConfigData: any;
  lob: string;
  loginModel: ILogin;
  registrationModel: ICustomerRegistration;
  errorMessage: string;
  serverErrors: IMessage [];
  token: string;
  sso: string;
  target: string;
  sessionExpired: string;
  model: ILogin;
  errorCode: string;
  customerId: string;

  currentUser: any;
  isLoggedIn: boolean;
  isRegistered: boolean;
  isAfterLogin: boolean;
  
  
  constructor(private router: Router,
    private applicationService: ApplicationService,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private customerService: CustomerService,
    private registrationService: RegistrationService,
    private sessionStorageService: SessionStorageService,
    private activatedRoute: ActivatedRoute) { 
      this.activatedRoute.queryParams.subscribe(params => {
        /* this.token = params['token'];
        this.sso = params['sso'];
        this.target = params['target'];    
        this.sessionExpired = params['session'] */
      });
    }

  ngOnInit() {
    this.serverErrors = [];
    this.loginModel = { "email": "", "password": "", "token": this.token }
    this.isLoggedIn = false;
    this.globalConfigData = this.applicationService.getGlobalConfigurations();
    
    this.registrationModel = {
      "id": "",
      "email": "",
      "password": "",
      "confirmPassword": "",
      "firstName": "", 
      "lastName": "",
      "signupFlag": false,
      "agreeFlag": false
    }
  } 

  onClickRegister(event) {
    this.serverErrors = [];
    let customer = JSON.parse(JSON.stringify(this.registrationModel));
    
    this.customerService.createCustomer(customer).subscribe(
      response => this.createCustomerOnSuccess(response, event, customer),
      response => this.createCustomerOnError(response)
    );
  }

  private createCustomerOnSuccess(response: any, user: any, customer: ICustomerRegistration): void {
    this.isRegistered = true;
    this.isLoggedIn = false;
   
    this.navigationService.navigateToRegistrationCompleted();
  }


  private createCustomerOnError(response: any): void {
    this.serverErrors = response;
  }

  // onSubmit() {
    
  // }
  
}