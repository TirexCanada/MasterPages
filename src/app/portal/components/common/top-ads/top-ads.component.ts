import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';  
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';


import { ListingBlockComponent } from '../listings/listing-block/listing-block.component';

import { ApplicationService } from '../../../../shared/services/application.service';
import { CustomerService } from '../../../../shared/services/customer.service';
import { ClassifiedService } from '../../../../shared/services/classified.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { NavigationService } from '../../../../shared/services/navigation.service';

import { ICustomer } from '../../../../shared/interfaces/customer.interface';
import { IListing } from '../../../../shared/interfaces/listing.interface';
import { IMessage } from '../../../../shared/interfaces/message.interface';

@Component({
  selector: 'app-top-ads',
  standalone: true,
  imports: [CommonModule, ListingBlockComponent, TranslateModule],
  providers: [ApplicationService, CustomerService, ClassifiedService, SessionStorageService, NavigationService, TranslateService],
  templateUrl: './top-ads.component.html',
  styleUrls: ['./top-ads.component.scss']
})
export class TopAdsComponent implements OnInit, OnChanges {
  @Input()  topListings: IListing [];
  @Input()  topPriorityListings: IListing [];
  @Input()  categoryType: string;

  isRecentActive: boolean = true;
  listings: IListing[];
  currentView: string = "list";
 
  constructor(private classifiedService: ClassifiedService) { }

  ngOnInit(): void {
    this.getListings("recent");
  }

  ngOnChanges(): void {
    this.getListings("recent");
  }

  getListings(flag) {
    if (flag === "recent") {
      this.isRecentActive = true;
      if (this.topListings !== null && this.topListings !== undefined) {
        this.listings = JSON.parse(JSON.stringify(this.topListings));
      }
    }
    else {
      this.isRecentActive = false;
      if (this.topListings !== null && this.topPriorityListings !== undefined) {
        this.listings = JSON.parse(JSON.stringify(this.topPriorityListings));
      }
    }
  }

  toggle(view: string) {
    this.currentView = view;
  }
}
