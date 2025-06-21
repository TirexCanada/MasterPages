import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { InputValidatorDirective } from '../../../../../app/shared/directives/input-validator.directive';

import { ApplicationService } from '../../../../../app/shared/services/application.service';
import { CustomerService } from '../../../../../app/shared/services/customer.service';
import { SessionStorageService } from '../../../../../app/shared/services/session-storage.service';

import { ICustomer } from '../../../../../app/shared/interfaces/customer.interface';
import { IListing } from '../../../../../app/shared/interfaces/listing.interface';
import { IMessage } from '../../../../../app/shared/interfaces/message.interface';


@Component({
  selector: 'app-tags-input',
  standalone: true,
  imports:[FormsModule, CommonModule, InputValidatorDirective],
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.css']
})
export class TagsInputComponent implements OnInit, OnChanges {

  @Input() listingTags: any [];
  @Input() model: any;
  
  @Output() tagAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() tagDeleted: EventEmitter<any> = new EventEmitter<any>();

  tags: any [];

  constructor(private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    this.tags = this.sessionStorageService.getTags();
    this.mapListingTags();
  }

  ngOnChanges(): void {
    this.tags = this.sessionStorageService.getTags();
    this.mapListingTags();
  }

  mapListingTags() {
    this.listingTags.map(x => {
      let tag = this.tags?.find(t => t.id === x.tagId);
      x.tagName = tag.tagName;
      //x.sortOrder = tag.sortOrder;
    })

    this.listingTags = _.sortBy(this.listingTags, "sortOrder");
  }

  removeTag(listingTag){
    this.listingTags.splice(this.listingTags.indexOf(listingTag), 1);
    this.tagDeleted.emit(this.listingTags);
  }
}
