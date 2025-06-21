import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import * as jwt_decode from 'jwt-decode';

import { ApplicationService } from "../../../../shared/services/application.service";
import { CustomerService } from "../../../../shared/services/customer.service";
import { NavigationService } from "../../../../shared/services/navigation.service";
import { AuthenticationService } from "../../../../shared/services/authentication.service";
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { environment } from '../../../../../../src/environments/environment';
import { CurrentCustomerResolver } from '../../../resolvers/current-customer.resolver';

import { ILogin } from "../../../../shared/interfaces/login.interface";
import { IMessage } from "../../../../shared/interfaces/message.interface";


@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [FormsModule, CommonModule, TranslateModule],
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @Input() isVisible: boolean;
  @Input() form: NgForm;
  @Input() section: String;
  @Input() model: ILogin;
  @Input() token: string;
  @Input() mainLogin: boolean;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() loggedIn: EventEmitter<any> = new EventEmitter<any>();
  @Output() loginFailed: EventEmitter<any> = new EventEmitter<any>();

  loginResponseModel: any;
  submitted: boolean;
  decodedToken: any;
  showPassword: boolean;
  buttonClass: string;

  verifyEmailMode: boolean = false;
  verificationAttemptsCount: number = 0;

  validationData: any;

  constructor(private authenticationService: AuthenticationService,
    private applicationService: ApplicationService,
    private customerService: CustomerService,
    private navigationService: NavigationService,
    private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.validationData = this.applicationService.getValidationData();
    this.submitted = false;
    this.verifyEmailMode = false;
    this.verificationAttemptsCount = 0;
    this.buttonClass = "fa fa-eye";
  }

  login() {
    this.submitted = true;
    this.form.onSubmit(null);

    if (this.model.email !== '' && this.model.password !== '') {
      this.authenticationService.login(this.model).subscribe(
        response => this.loginOnSuccess(response),
        response => this.loginOnError(response)
      )
    };
  }

  templogin() {
    this.form.onSubmit(null);

    if (this.form.valid) {
      if (this.model.email !== '' && this.model.password !== '') {   
        this.authenticationService.templogin(this.model).subscribe(
          response => this.loginOnSuccess(response),
          response => this.loginOnError(response)
        )
      }
    }
  }

  private loginOnSuccess(response: any ): void {
    this.sessionStorageService.setAuthHeader(response.jwtToken);     
    this.sessionStorageService.setCurrentCustomer(response); 
    
    this.loggedIn.emit(response);
  }

  private loginOnError(response: any): void {
    this.submitted = false;
    if (response !== null && response !== undefined) {
      if (response.error !== null && response.error !== undefined && response.error.length > 0) {
        if (response.error[0]?.code === "1000") {
          this.verifyEmailMode = true;
          this.loginFailed.emit(response);
        }
        else if (response.error[0]?.code === "1") {
          this.loginFailed.emit(response);
        }
      }
      else {
        this.loginFailed.emit(response);
      }
    }
    else {
      this.loginFailed.emit(response);
    }
  }

  forgotPassword() {
    this.navigationService.navigateToForgotPassword();
  }

  loginWithCode() {
    this.form.onSubmit(null);
    this.submitted = true;

    if ((this.model.verificationCode !== null && this.model.verificationCode !== undefined) || this.model.verificationCode.length < 6) {
      this.authenticationService.login(this.model).subscribe(
        response => this.loginWithCodeOnSuccess(response),
        response => this.loginWithCodeOnError(response)
      )
    };
  }

  private loginWithCodeOnSuccess(response: any ): void {
    this.sessionStorageService.setAuthHeader(response.jwtToken);     
    this.sessionStorageService.setCurrentCustomer(response);
    this.loggedIn.emit(response);
  }

  private loginWithCodeOnError(response: any): void {
    this.loginFailed.emit(response);
  }

  onSubmit(): Promise<any> | boolean {
    this.submitted = true;
    return false;
  }

  
  onModelChange(newModel: any) {
    this.model = newModel;
    this.modelChange.emit(newModel);
  }

  // Call this method whenever the model changes
  updateModel(newModel: any) {
    this.onModelChange(newModel);
  }

  // click toggle Password type function
  togglePassword() {
    this.showPassword = !this.showPassword;
    this.buttonClass = (!this.showPassword) ? "fa fa-eye-slash" : "fa fa-eye";
  } 
}