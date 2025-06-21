import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router'; 

import { ApplicationService } from '../../../../shared/services/application.service';
import { CustomerService } from '../../../../shared/services/customer.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

import { ICustomer } from '../../../../shared/interfaces/customer.interface';
import { IListing } from '../../../../shared/interfaces/listing.interface';
import { IMessage } from '../../../../shared/interfaces/message.interface';


@Component({
  selector: 'app-tags-list',
  standalone: true, 
  imports: [CommonModule, RouterModule, TranslateModule],
  providers: [ApplicationService, CustomerService, SessionStorageService, TranslateService],
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent implements OnInit {

  @Input() listingTags: any [];
  
  constructor( public translateService: TranslateService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }
}
