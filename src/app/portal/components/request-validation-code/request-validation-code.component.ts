import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { environment } from '../../../../environments/environment';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { ApplicationService } from "../../../shared/services/application.service";
import { AuthenticationService } from "../../../shared/services/authentication.service";
import { CustomerService } from "../../../shared/services/customer.service";

import { IMessage } from '../../../shared/interfaces/message.interface';

@Component({
  selector: 'app-request-validation-code',
  standalone: true, 
  imports: [FormsModule, CommonModule, TranslateModule],
  providers: [AuthenticationService, ApplicationService],
  templateUrl: './request-validation-code.component.html',
  styleUrls: ['./request-validation-code.component.css']
})

export class RequestValidationCodeComponent implements OnInit {
  @Input() model: any;
  @Input() isLock: boolean;
  @Input() isWebPortal: boolean;
  @Input() title: string;
  @Input() type: string;
  @Input() message1: string;
  @Input() message2: string;
   
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitFormCode: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitFailed: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelForm: EventEmitter<any> = new EventEmitter<any>(); 

  serverErrors: IMessage [];
  submitted: boolean;
  showPassword: boolean;
  mode: string;
  validationData: any;
  
  destroyed = new Subject<any>();

  @ViewChild('form', { static: true }) form: NgForm;
  
  constructor(private customerService: CustomerService,
    private applicationService: ApplicationService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.validationData = this.applicationService.getValidationData();
    this.serverErrors = [];
    this.submitted = false;
    this.showPassword = false;
    this.mode = "email";
    //this.model = {"email": "", "verificationCode": ""};
  }

  submit() {
    this.submitted = true;
    this.form.onSubmit(null);

    if (this.form.valid) {
      let emailRequestModel: any = {};

      switch (this.type) {
        case "lock":
          emailRequestModel = {"email": this.model.email , "lob": "cf", "emailType": "lock-verificationcode", "optionalParam": null};
          break;
        case "locked":
          emailRequestModel = {"email": this.model.email , "lob": "cf", "emailType": "locked-verificationcode", "optionalParam": null};
          break;
        case "forgot":
            emailRequestModel = {"email": this.model.email , "lob": "cf", "emailType": "forgot-verificationcode", "optionalParam": null};
            break;
      }

      this.authenticationService.verifyEmail(emailRequestModel).pipe(
        takeUntil(this.destroyed)
      ).subscribe(
        response => this.verifyEmailOnSuccess(response),
        response => this.verifyEmailOnError(response)
      );
    }
  }

  verifyEmailOnSuccess(response) {
    this.mode = "code";
    this.submitted = false;
    this.submitForm.emit(response);
  }

  verifyEmailOnError(response) {
    this.submitted = false;
    this.submitFailed.emit(response);
  }


  submitCode() {
    this.serverErrors = [];
    this.submitted = true;
    this.form.onSubmit(null);

    if (this.form.valid) {
      let emailRequestModel: any = {};

      switch (this.type) {
        case "lock":
          emailRequestModel = {"email": this.model.email , "type": "email", "optionalParam": this.model.verificationCode};
                  
       /*    this.customerService.lockCustomer(emailRequestModel)
          .subscribe(
            response => this.updateOnSuccess(response),
            response => this.updateOnError(response)
          ); */

          this.authenticationService.verifyCode(emailRequestModel).pipe(
            takeUntil(this.destroyed)
          ).subscribe(
            response => this.verifyCodeOnSuccess(response),
            response => this.verifyCodeOnError(response)
          );

          break;
        case "locked":
          if ((this.model.verificationCode !== null && this.model.verificationCode !== undefined) || this.model.verificationCode.length < 6) {
            let emailRequestModel = {"email": this.model.email, "type": "email", "optionalParam": this.model.verificationCode};

            this.authenticationService.verifyCode(emailRequestModel).pipe(
              takeUntil(this.destroyed)
            ).subscribe(
              response => this.verifyCodeOnSuccess(response),
              response => this.verifyCodeOnError(response)
            );
          }
  
          break;
        case "forgot":
          if ((this.model.verificationCode !== null && this.model.verificationCode !== undefined) || this.model.verificationCode.length < 6) {
            let emailRequestModel = {"email": this.model.email, "type": "email", "optionalParam": this.model.verificationCode};

            this.authenticationService.verifyCode(emailRequestModel).pipe(
              takeUntil(this.destroyed)
            ).subscribe(
              response => this.verifyCodeOnSuccess(response),
              response => this.verifyCodeOnError(response)
            );
          }
         
          break;
      }
    }
  }

  verifyCodeOnSuccess(response) {
    this.mode = "result";
    this.submitted = false;
    
    if (this.type === "lock") {
      let serverErrors = [];
      serverErrors.push({ "isSuccess": true, "code": "1", "message": "", "displayMessage": "You have successfully locked your account." });       
      this.submitFormCode.emit(serverErrors);
    }
    else {
      this.submitFormCode.emit(response);
    }
  }


  verifyCodeOnError(response) {
    this.submitted = false;
    this.submitFailed.emit(response);
  }

  getMessage(response: any ): void {
    let serverErrors = [];

    switch (this.type) {
      case "lock":
        serverErrors.push({ "isSuccess": true, "code": "1", "message": "", "displayMessage": "You have successfully locked your account. Please follow the instructions that had been sent to you by email if you would like unlock it." });
        break;
    }
      
    this.submitForm.emit(serverErrors);
  }

  private updateOnSuccess(response: any ): void {
    let serverErrors = [];

    switch (this.type) {
      case "lock":
        serverErrors.push({ "isSuccess": true, "code": "1", "message": "", "displayMessage": "You have successfully locked your account. Please follow the instructions that had been sent to you by email if you would like unlock it." });
        this.submitForm.emit(serverErrors);
        break;
      case "forgot":
        this.submitForm.emit(this.model.email);
        break;
    }
  }

  private updateOnError(response: any): void {
    this.submitFailed.emit(response);
  }

  cancel() {
    this.cancelForm.emit(null);
  }

  onSubmit() {    
  }

  ngOnDestroy() { 
    //this.destroyed.next();
    //this.destroyed.complete();
  }
}
