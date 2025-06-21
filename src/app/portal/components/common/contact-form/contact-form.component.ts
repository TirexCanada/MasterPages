import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApplicationService } from 'src/app/shared/services/application.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ClassifiedService } from 'src/app/shared/services/classified.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

import { ICustomer } from 'src/app/shared/interfaces/customer.interface';
import { IListing } from 'src/app/shared/interfaces/listing.interface';
import { IMessage } from 'src/app/shared/interfaces/message.interface';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  @Input() location: string;
  @Input() subject: string;
  @Input() message: string;

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

    this.model = { "name": "", "requestType": "classified", "customerToId": "", "customerFromId": "", "firstName": "", "email": "", "subject": "", "requestText": "", }
  }

  onSubmit() {

  }

  submit() {
    this.form.onSubmit(null);
    this.serverErrors = [];

    if (this.model.email !== '' 
      && this.model.name !== '' 
    
      && this.model.requestText !== '') { 
        this.customerService.createCustomerRequest(this.model).subscribe(
          response => this.submitOnSuccess(response),
          response => this.submitOnError(response)
        )
    };
  }

  private submitOnSuccess(response: any ): void {
    this.serverErrors.push({ "isSuccess": true, "code": "1", "message": "", "displayMessage": "Your message had been subnitted successfully." });
    /* this.submitForm.emit(this.serverErrors);
    this.resetForm(); */
  }

  private submitOnError(response: any): void {
    this.serverErrors = response;
    //this.submitForm.emit(this.serverErrors);
  }
}
