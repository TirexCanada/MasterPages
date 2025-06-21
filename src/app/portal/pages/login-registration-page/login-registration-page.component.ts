import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 

import { ApplicationService } from '../../../shared/services/application.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { RegistrationService } from '../../../shared/services/registration.service';
import { ClassifiedService } from '../../../shared/services/classified.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { RegistrationComponent } from '../../../portal/components/registration/registration.component';
import { LoginComponent } from '../../../portal/components/login/login/login.component';
import { ErrorMessageComponent } from '../../../portal/components/shared/common/error-message/error-message.component';

import { ICustomerRegistration } from "../../../shared/interfaces/customer-registration.interface";
import { IMessage } from "../../../shared/interfaces/message.interface";
import { ILogin } from "../../../shared/interfaces/login.interface";


import { APPLICATION_ROUTES } from '../../../shared/constants/app-constants';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login-registration-page',
  standalone: true, 
  imports: [TranslateModule,  FormsModule, RegistrationComponent, LoginComponent, ErrorMessageComponent, CommonModule],
  providers: [ApplicationService, AuthenticationService, NavigationService, RegistrationService, SessionStorageService, CustomerService, ClassifiedService],
  templateUrl: './login-registration-page.component.html',
  styleUrls: ['./login-registration-page.component.scss']
})
export class LoginRegistrationPageComponent implements OnInit {
  @ViewChild('registrationForm', { static: true }) registrationForm: NgForm;
  @ViewChild('loginForm', { static: true }) loginForm: NgForm;
  
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
  mode: string = "";

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
    this.mode = "registration";
    let customer = JSON.parse(JSON.stringify(this.registrationModel));
    
    this.customerService.createCustomer(customer).subscribe(
      response => this.createCustomerOnSuccess(response, event, customer),
      response => this.createCustomerOnError(response)
    );
  }

  private createCustomerOnSuccess(response: any, user: any, customer: ICustomerRegistration): void {
    this.isRegistered = true;
    this.isLoggedIn = false;
   
    this.navigationService.navigateToAddPost();
  }


  private createCustomerOnError(response: any): void {
    this.serverErrors = response?.error;
  }

  onLoggedIn(response) {
    this.serverErrors = [];
    this.isRegistered = false;
    this.isLoggedIn = true;

    this.sessionStorageService.setAuthHeader(response.jwtToken);     
    this.sessionStorageService.setCurrentCustomer(response); 
    
    this.navigationService.navigateToAddPost();
  }

  onLoginFailed(response) {
    this.mode = "login";
    if (response !== null && response !== undefined && response?.error?.length > 0) {
      if (response?.error[0].code === "1000") {
        this.serverErrors = [];
      }
      else {
        this.serverErrors = response?.error;
      }
    }

    this.isRegistered = false;
    this.isLoggedIn = false;

    if (response !== null && response.length > 0) {
      let code = response[0].code;
    
      if (code.indexOf(":") > 0) {
        this.errorCode = code.substring(0, code.indexOf(":"));
        this.customerId = code.substring(code.indexOf(":") + 1);
      }
    }
  }

  onSubmit(): Promise<any> | boolean {
    this.errorMessage = "";
    return false;
  }

  loginOnSuccess(response: any ): void {
    this.sessionStorageService.setAuthHeader(response.jwtToken);     
    this.sessionStorageService.setCurrentCustomer(response); 
    window.location.href = `/#/${APPLICATION_ROUTES.portal.portal}` + "/" + this.target;
  }

  loginOnError(response: any): void {
    this.serverErrors = response;
  }
  
}