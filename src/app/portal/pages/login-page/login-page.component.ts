import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { ApplicationService } from '../../../shared/services/application.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

import { LoginComponent } from '../../../portal/components/login/login/login.component';
import { ErrorMessageComponent } from '../../../portal/components/shared/common/error-message/error-message.component';

import { ICustomerRegistration } from "../../../shared/interfaces/customer-registration.interface";
import { IMessage } from "../../../shared/interfaces/message.interface";
import { ILogin } from "../../../shared/interfaces/login.interface";

import { APPLICATION_ROUTES } from '../../../shared/constants/app-constants';
import { environment } from '../../../../../src/environments/environment';


@Component({
  selector: 'login-page',
  standalone: true, 
  providers: [ApplicationService, AuthenticationService, NavigationService, SessionStorageService, CustomerService],
  imports: [TranslateModule, CommonModule, LoginComponent, ErrorMessageComponent, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

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

  currentUser: any;
  isLoggedIn: boolean;
  isRegistered: boolean;
  isAfterLogin: boolean;
  
  
  constructor(private router: Router,
    private applicationService: ApplicationService,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private customerService: CustomerService,
    private sessionStorageService: SessionStorageService,
    private activatedRoute: ActivatedRoute) { 
      this.activatedRoute.queryParams.subscribe(params => {
        this.token = params['token'];
        this.sso = params['sso'];
        this.target = params['target'];    
        this.sessionExpired = params['session']
      });
    }

  ngOnInit() {
    this.serverErrors = [];
    this.loginModel = { "email": "", "password": "", "token": this.token }
    this.isLoggedIn = false;
    this.globalConfigData = this.applicationService.getGlobalConfigurations();
    
    if (this.sso) {
      if (this.sso === "n") {
        this.authenticationService.logout();
        this.router.navigate([], {queryParams: {page: null}, queryParamsHandling: 'merge'});
      }
      else {
        //TODO Login with sso
        //this.model = { "email": "", "password": "", "lob": environment.lob, "sso": this.sso }

        this.authenticationService.login(this.model).subscribe(
          response => this.loginOnSuccess(response),
          response => this.loginOnError(response)
        )
      }
    }

    if (this.sessionExpired === 'true') {
      this.serverErrors.push({"displayMessage": "Your session had been expired. Please, login to get back to Your Classified Portal."});
    }
  } 

  onLoggedIn(response) {
    this.serverErrors = [];
    this.isRegistered = false;
    this.isLoggedIn = true;

    this.sessionStorageService.setAuthHeader(response.jwtToken);     
    this.sessionStorageService.setCurrentCustomer(response); 
    
    //this.navigationService.navigateToProfile();
    this.navigationService.navigateToDashboard();
  }

  onLoginFailed(response) {
    if (response !== null && response !== undefined && response.error !== null && response.error !== undefined && response.error.length > 0) {
      if (response.error[0].code === "1000") {
        this.serverErrors = [];
      }
      else {
        this.serverErrors = response.error;
      }
    }

    this.isRegistered = false;
    this.isLoggedIn = false;

    if (response !== null && response !== undefined && response.error !== null && response.error !== undefined && response.error.length > 0) {
      let code = response.error[0].code;
    
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

  requestUnlock() {
    this.navigationService.navigateToUnlockPassword();
  }
}