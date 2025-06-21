import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApplicationService } from 'src/app/shared/services/application.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

import { ICustomer } from 'src/app/shared/interfaces/customer.interface';
import { IListing } from 'src/app/shared/interfaces/listing.interface';
import { IMessage } from 'src/app/shared/interfaces/message.interface';


@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.css']
})
export class TagItemComponent implements OnInit, OnChanges {

  @Input() tags: any [];
  @Output() clickCancel: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }
}
