import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms'; 

import { ApplicationService } from '../../../../../shared/services/application.service';
import { CustomerService } from '../../../../../shared/services/customer.service';
import { ClassifiedService } from '../../../../../shared/services/classified.service';
import { SessionStorageService } from '../../../../../shared/services/session-storage.service';
import { MultiLineQuestionComponent } from '../../../../components/generic-components/multi-line-question/multi-line-question.component';



import { ICustomer } from '../../../../../shared/interfaces/customer.interface';
import { IListing } from '../../../../../shared/interfaces/listing.interface';
import { IMessage } from '../../../../../shared/interfaces/message.interface';
import { DateFormatLongPipe } from '../../../../../shared/pipes/date-format-long.pipe';

@Component({
  selector: 'app-listing-contact-form',
  standalone: true, 
  imports: [CommonModule, FormsModule, MultiLineQuestionComponent],
  providers: [ApplicationService, CustomerService, ClassifiedService, SessionStorageService, DateFormatLongPipe],
  templateUrl: './listing-contact-form.component.html',
  styleUrls: ['./listing-contact-form.component.css']
})
export class ListingContactFormComponent implements OnInit, OnChanges {

  @Input() location: string;
  @Input() subject: string;
  @Input() message: string;
  @Input() listing: IListing;

  model: any;
  submitted: boolean;
  orgModel: ICustomer;
  customerModel: any;
  validationData: any;
  section: string;
  serverErrors: IMessage [];
  showNavigationButtons: boolean = false;

  destroyed = new Subject<any>();

  @ViewChild('contactForm', { static: true }) form: NgForm; 

   constructor(private applicationService: ApplicationService,
    private customerService: CustomerService,
    private classifiedService: ClassifiedService,
    private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    this.validationData = this.applicationService.getValidationData();
    this.serverErrors = null;
    this.model = { "name": "", "emailType": "classified", "requestType": "classified", "customerToId": this.listing.customerId, "customerFromId": "", "firstName": "", "email": "", "subject": "", "requestText": "", }
  }

  ngOnChanges(): void {
    this.model = { "name": "", "emailType": "classified", "requestType": "classified", "customerToId": this.listing.customerId, "customerFromId": "", "firstName": "", "email": "", "subject": "", "requestText": "", }
  }

  onSubmit() {

  }

  submit() {
    this.form.onSubmit(null);
    this.serverErrors = [];

    this.customerService.createCustomerRequest(this.model).subscribe(
      response => this.submitOnSuccess(response),
      response => this.submitOnError(response)
    )

  }

  private submitOnSuccess(response: any ): void {
    this.serverErrors = [];
    this.serverErrors.push({ "isSuccess": true, "code": "1", "message": "", "displayMessage": "Your message had been submitted successfully." });
    /* this.submitForm.emit(this.serverErrors);
    this.resetForm(); */
  }

  private submitOnError(response: any): void {
    this.serverErrors = response;
    //this.submitForm.emit(this.serverErrors);
  }
}
