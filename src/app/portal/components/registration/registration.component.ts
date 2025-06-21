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
import { PasswordDirective } from '../../../shared/directives/password.directive';

@Component({
  selector: 'app-registration',
  standalone: true, 
  imports: [TranslateModule, FormsModule, CommonModule, SafePipe, EmailInputComponent, PasswordInputComponent, PasswordDirective],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnChanges {
  @Input() form: NgForm;
  @Input() model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickRegister: EventEmitter<any> = new EventEmitter<any>();

  termsAndConditions: any;
  ontarioFlagLabel: string;
  errorMessage: string;
  submitted: boolean;
  showPassword: boolean;
  buttonClass: string;
  validationData: any;

  constructor(public applicationService: ApplicationService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.applicationService.getConfig().subscribe(data => {
      this.validationData = data?.validations;
      //console.log(this.config);
    });
    //this.validationData = this.applicationService.getValidationData();
    this.submitted = false;
    this.showPassword = false;
    this.buttonClass = "fa fa-eye";
    this.termsAndConditions = this.applicationService.getContentData().termsAndConditions;
    this.ontarioFlagLabel = "By using this product, I understand that the materials are meant for use in: <strong>Ontario, Canada ONLY</strong>"
  }

  ngOnChanges() {

  }

  // click toggle Password type function
   togglePassword() {
    this.showPassword = !this.showPassword;
    this.buttonClass = (!this.showPassword) ? "fa fa-eye-slash" : "fa fa-eye";
  } 

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  register() {
    this.submitted = true;
    this.errorMessage = "";

    if (this.model.password !== this.model.confirmPassword) {
      this.errorMessage = "Passwords should match";
    }

    //Check if form is valid
    if (this.form.valid) {

      //Check if agreeFlag is checked and errorMessage is empty
      /* if (!this.errorMessage && this.model.agreeFlag && this.model.ontarioFlag) { */
      if (!this.errorMessage) {
        this.clickRegister.emit(this.model);
      }

      return true;
    }

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
}