import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailInputComponent } from '../shared/input-components/email-input/email-input.component';
import { PasswordInputComponent } from '../shared/input-components/password-input/password-input.component';
import { ApplicationService } from '../../../shared/services/application.service';
import { SafePipe } from '../../../shared/pipes/sanitize.pipe';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

import { AdminService } from "../../../shared/services/admin.service";
import { CustomerService } from "../../../shared/services/customer.service";

import { ICustomer } from "../../../shared/interfaces/customer.interface";
import { IAdmin } from "../../../shared/interfaces/admin.interface";


@Component({
  selector: 'app-update-password',
  standalone: true, 
  imports: [TranslateModule, FormsModule, CommonModule, SafePipe, EmailInputComponent, PasswordInputComponent],
  providers: [AdminService, CustomerService, ApplicationService],
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit, OnChanges {
  @Input() currentCustomer: ICustomer;
  @Input() currentAdmin: IAdmin;
  @Input() form: NgForm;
  @Input() isChangeMode: boolean;
  @Input() model: any;
  @Input() token: string;
  @Input() section: string;
  
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitFailed: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelForm: EventEmitter<any> = new EventEmitter<any>(); 
  @Output() submitFormPassword: EventEmitter<any> = new EventEmitter<any>();

  submitted: boolean;
  showPassword: boolean;
  buttonClass: string;
  errorMessage: string;
  globalConfigData: any;
  
  constructor(private customerService: CustomerService,
    private adminService: AdminService,
  private applicationService: ApplicationService) { }

  ngOnInit() {
    this.submitted = false;
    this.showPassword = false;
    this.buttonClass = "fa fa-eye";
    this.globalConfigData = this.applicationService.getGlobalConfigurations();
  }

  ngOnChanges() {
   
  }

  submit() {
    let serverErrors = [];
    this.errorMessage = "";
    this.submitted = true;
    this.form.onSubmit(null);

    if (this.isChangeMode) {
      if (this.model.oldPassword.oldPassword && this.model.password.password && this.model.confirmPassword.confirmPassword) {
        if (this.model.oldPassword.oldPassword !== this.model.confirmPassword.confirmPassword) {
          serverErrors.push({ "code": "1", "message": "", "displayMessage": "New and Confirm New Passwords should match." });
          this.errorMessage = serverErrors[0].displayMessage;

          /* serverErrors.push({ "code": "1", "message": "", "displayMessage": "New and Confirm New Passwords should match." });
          this.updateOnError(serverErrors); */
        }
        else {
          if (this.currentCustomer) {
            let updateRequest = { "customerId": this.currentCustomer.id, "oldPassword": this.model.oldPassword.oldPassword, "password": this.model.password.password };
  
            this.customerService.changePassword(updateRequest).subscribe(
              response => this.updateOnSuccess(response),
              response => this.updateOnError(response)
            )
          }
          else {
            let updateRequest = { "customerId": this.currentAdmin.id, "oldPassword": this.model.oldPassword.oldPassword, "password": this.model.password.password };
            this.adminService.changeAdminPassword(updateRequest).subscribe(
              response => this.updateAdminOnSuccess(response),
              response => this.updateAdminOnError(response)
            )
          }
        }
      }
    }
    else {
      if (this.model.password.password && this.model.confirmPassword.confirmPassword) {
        if (this.model.password.password !== this.model.confirmPassword.confirmPassword) {
          /* serverErrors.push({ "code": "1", "message": "", "displayMessage": "New and Confirm New Passwords should match." });
          this.updateOnError(serverErrors); */

          serverErrors.push({ "code": "1", "message": "", "displayMessage": "New and Confirm New Passwords should match." });
          this.errorMessage = serverErrors[0].displayMessage;
          //this.updateOnError(serverErrors);
        }
        else {
          let updateRequest = { "customerId": this.model.customerId, "oldPassword": null, "password": this.model.password.password, "email": this.model.email };
          this.customerService.changePassword(updateRequest).subscribe(
            response => this.updateOnSuccess(response),
            response => this.updateOnError(response)
          )
        }
      }
    }
  }

  private updateOnSuccess(response: any ): void {
    let serverErrors = [];
    if (this.isChangeMode) {
      serverErrors.push({ "isSuccess": true, "code": "1", "message": "", "displayMessage": "Your password had been updated successfully. Please, return back to Your Portal." });
    }
    else {
      serverErrors.push({ "isSuccess": true, "code": "1", "message": "", "displayMessage": "Your password had been updated successfully. Please, click the button below to navigate to Login page and login with the new password." });
    }
    this.submitFormPassword.emit(serverErrors);
  }

  private updateOnError(response: any): void {
    this.submitFailed.emit(response);
  }

  private updateAdminOnSuccess(response: any ): void {
    let serverErrors = [];
    if (this.isChangeMode) {
      serverErrors.push({ "isSuccess": true, "code": "1", "message": "", "displayMessage": "Your password had been updated successfully. Please, click the link below to return back to Admin Dashboard." });
    }
    else {
      serverErrors.push({ "isSuccess": true, "code": "1", "message": "", "displayMessage": "Your password had been updated successfully. Please, click the link below to navigate to Login page to login with the new password." });
    }
    this.submitForm.emit(serverErrors);
  }

  private updateAdminOnError(response: any): void {
    this.submitFailed.emit(response);
  }

  cancel() {
    this.cancelForm.emit(null);
  }

  onSubmit() {    
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.buttonClass = (!this.showPassword) ? "fa fa-eye-slash" : "fa fa-eye";
  } 
}
