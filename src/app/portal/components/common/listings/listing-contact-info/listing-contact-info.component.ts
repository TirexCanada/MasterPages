import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';  

import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApplicationService } from '../../../../../shared/services/application.service';
import { CustomerService } from '../../../../../shared/services/customer.service';
import { ClassifiedService } from '../../../../../shared/services/classified.service';
import { SessionStorageService } from '../../../../../shared/services/session-storage.service';
import { DateFormatPipe } from '../../../../../shared/pipes/date-format.pipe';
import { DateFormatLongPipe } from '../../../../../shared/pipes/date-format-long.pipe';

import { ICustomer } from '../../../../../shared/interfaces/customer.interface';
import { IListing } from '../../../../../shared/interfaces/listing.interface';
import { IMessage } from '../../../../../shared/interfaces/message.interface';

@Component({
  selector: 'app-listing-contact-info',
  standalone: true, 
  imports: [CommonModule],
  providers: [ApplicationService, CustomerService, ClassifiedService, SessionStorageService, DateFormatLongPipe],
  templateUrl: './listing-contact-info.component.html',
  styleUrls: ['./listing-contact-info.component.css']
})
export class ListingContactInfoComponent implements OnInit, OnChanges {
  @Input() listing: IListing;

  phoneNumber: string;
  phoneNumberLabel: string = "Show Phone Number";

  constructor() { }

  ngOnInit(): void {   
    if (this.listing !== null && this.listing !== undefined) {
      this.phoneNumber = JSON.parse(JSON.stringify(this.listing?.customerContactInformation?.phoneNumber));
      this.getPhoneNumber();
    }
  }

  ngOnChanges(): void {  
    if (this.listing !== null && this.listing !== undefined) { 
      this.phoneNumber = JSON.parse(JSON.stringify(this.listing?.customerContactInformation?.phoneNumber));
      this.getPhoneNumber();
    }
  }


  getPhoneNumber() {
    if (this.phoneNumber !== null && this.phoneNumber !== undefined && this.phoneNumber.trim() !== "" && this.phoneNumber.length > 3) {
      if (this.phoneNumber.substring(this.phoneNumber.length - 4) !== "****") {
        //this.phoneNumber = this.phoneNumber.substring(0, this.phoneNumber.length - 4) + "****";
        this.phoneNumber = JSON.parse(JSON.stringify(this.listing?.phone));
        this.phoneNumberLabel = "Show Phone Number";
      }
      else {
        this.phoneNumber = JSON.parse(JSON.stringify(this.listing?.phone));
        this.phoneNumberLabel = "Hide Phone Number";
      }
    }
  }  
}
