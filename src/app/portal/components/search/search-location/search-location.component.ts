import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../../shared/services/application.service';
import { CustomerService } from '../../../../shared/services/customer.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';

import { ICustomer } from '../../../../shared/interfaces/customer.interface';
import { IListing } from '../../../../shared/interfaces/listing.interface';
import { IMessage } from '../../../../shared/interfaces/message.interface';

@Component({
  selector: 'app-search-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit {

  model: any;
  submitted: boolean;
  orgModel: ICustomer;
  customerModel: any;
  validationData: any;
  section: string;
  serverErrors: IMessage [];
  showNavigationButtons: boolean = false;

  destroyed = new Subject<any>();

   constructor(private applicationService: ApplicationService,
    private customerService: CustomerService,
    private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    this.validationData = this.applicationService.getValidationData();
  }


  onSubmit() {

  }

  submit() {

  }
}
