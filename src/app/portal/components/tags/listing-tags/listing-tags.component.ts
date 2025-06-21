import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { CommonModule } from '@angular/common';  

import { ApplicationService } from '../../../../shared/services/application.service';
import { CustomerService } from '../../../../shared/services/customer.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { TagsListComponent } from '../tags-list/tags-list.component';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

import { ICustomer } from '../../../../shared/interfaces/customer.interface';
import { IListing } from '../../../../shared/interfaces/listing.interface';
import { IMessage } from '../../../../shared/interfaces/message.interface';
import { ITag } from '../../../../shared/interfaces/tag.interface';

@Component({
  selector: 'app-listing-tags',
  standalone: true, 
  imports: [CommonModule, TagsListComponent, TranslateModule],
  providers: [ApplicationService, CustomerService, SessionStorageService, TranslateService],
  templateUrl: './listing-tags.component.html',
  styleUrls: ['./listing-tags.component.css']
})
export class ListingTagsComponent implements OnInit, OnChanges {

  @Input() listingTags: any [];
  
  tags: any [];

  constructor(private sessionStorageService: SessionStorageService,
    public translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.tags = this.sessionStorageService.getTags();
    this.mapListingTags();
  }

  ngOnChanges(): void {
    this.mapListingTags();
  }

  mapListingTags() {
    this.listingTags.map(x => {
      let tag = this.tags.find(t => t.id === x.tagId);
      x.tagName = tag.tagName;
      x.tagName_RU = tag.tagName_RU;
      x.sortOrder = tag.sortOrder;
    })

    this.listingTags = _.sortBy(this.listingTags, "sortOrder");
  }
}
