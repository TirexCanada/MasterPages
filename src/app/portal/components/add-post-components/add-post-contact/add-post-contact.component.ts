import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { DisableDirective } from '../../../../../app/shared/directives/disable.directive';


import { ApplicationService } from '../../../../../app/shared/services/application.service';
import { CustomerService } from '../../../../../app/shared/services/customer.service';
import { ClassifiedService } from '../../../../../app/shared/services/classified.service';
import { SessionStorageService } from '../../../../../app/shared/services/session-storage.service';
import { AuthenticationService } from "../../../../shared/services/authentication.service";
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { MultiLineQuestionComponent } from '../../../components/generic-components/multi-line-question/multi-line-question.component';
import { OneLineQuestionComponent } from '../../../components/generic-components/one-line-question/one-line-question.component';

import { ICustomer } from '../../../../../app/shared/interfaces/customer.interface';
import { IListing } from '../../../../../app/shared/interfaces/listing.interface';
import { IMessage } from '../../../../../app/shared/interfaces/message.interface';

@Component({
  selector: 'app-add-post-contact',
  standalone: true, 
  imports: [FormsModule, CommonModule, TranslateModule, MultiLineQuestionComponent, OneLineQuestionComponent, DisableDirective],
  providers: [AuthenticationService],
  templateUrl: './add-post-contact.component.html',
  styleUrls: ['./add-post-contact.component.css']
})
export class AddPostContactComponent implements OnInit, OnChanges {
  @Input() model: IListing;
  @Input() currentCustomer: ICustomer;
  @Input() submitted: boolean;


  orgModel: IListing;
  validationData: any;
  isDisabled: any = { "profle-image": true, "phone": true, "website": true };
  errorMessage: string = "";

  destroyed = new Subject<any>();

  
  @ViewChild('form', { static: true }) form: NgForm;

  constructor(private applicationService: ApplicationService,
    private customerService: CustomerService) { }

  ngOnInit(): void {   
    this.validationData = this.applicationService.getValidationData();
    this.getContactInfo();
  }

  ngOnChanges(): void {   
    this.getContactInfo();
  }

  getContactInfo() {
    if (this.model !== null && this.model !== undefined) {
      if (this.model.phone === null || this.model.phone === undefined) {
        this.model.phone = this.currentCustomer.customerContactInformation?.phoneNumber;
      }

      if (this.model.website === null || this.model.website === undefined) {
        this.model.website = this.currentCustomer.website;
      }

      this.orgModel = {};
      this.orgModel.phone = this.model.phone;
      this.orgModel.website = this.model.website;
    }
  }


  editClick(type: string) {
    this.isDisabled[type] = false;
  }

  saveClick(type: string) {
    this.submitted = true;
    this.errorMessage = "";
    let listing: any;
    if (this.validateForm(this.model, type)) {
      this.model.customerId = this.currentCustomer.id;
      listing = JSON.parse(JSON.stringify(this.model)); 
      listing.email = this.currentCustomer.email;
  
      this.customerService.updateListingContact(listing).pipe(
        takeUntil(this.destroyed)
      ).subscribe(
        response => this.updateListingOnSuccess(response, type),
        response => this.updateListingOnError(response)
      );
    }
  }

  private updateListingOnSuccess(response: any , type: string): void {
    this.submitted = false;
    this.isDisabled[type] = true;
    this.orgModel.phone = response.phone;
    this.orgModel.website = response.website;
  }
  
  private updateListingOnError(response: any): void {
    //this.serverErrors = response; 
  }

  cancelClick(type: string) {
    this.submitted = false;
    this.model = this.orgModel;
    this.isDisabled[type] = true;
  }

  validateForm(model: IListing, type: string) {
    let validate = true;

    /* switch(type) {
      case "listing":
        this.errorMessage = "";

        if (model.title === null || model.title === undefined || model.title.trim() === "") {
          this.errorMessage = "Title and Listing details are the required fields. Please fill in all the required fields and try to Save again.";
          return false;
        }

        if (model.description === null || model.description === undefined || model.description.trim() === "") {
          this.errorMessage = "Title and Listing details are the required fields. Please fill in all the required fields and try to Save again.";
          return false;
        }
        break;
    } */

    return validate;
  }
  onSubmit() {
    
  }
}

