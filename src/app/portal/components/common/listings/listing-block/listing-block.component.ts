import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';  
import { PhoneFormatPipe } from '../../../../../shared/pipes/phone-format.pipe';
import { DateFormatLongPipe } from '../../../../../shared/pipes/date-format-long.pipe';
import { LineBreaksPipe } from '../../../../../shared/pipes/line-breaks.pipe';
import { environment } from '../../../../../../environments/environment';

import { IListing } from '../../../../../shared/interfaces/listing.interface';

@Component({
  selector: 'app-listing-block',
  standalone: true,
  imports: [CommonModule, RouterModule, PhoneFormatPipe, LineBreaksPipe, DateFormatLongPipe],
  templateUrl: './listing-block.component.html',
  styleUrls: ['./listing-block.component.scss']
})
export class ListingBlockComponent implements OnInit, OnChanges {

  @Input() listing: any;
  @Input() location: string;
  @Input() currentView: string;
  @Input() categoryType: string;
  //@Input() parentPage: string;

  webApiUrl: string;
  listingImageUrl: string = "/assets/images/listings/default_r.png";;
  
  
  @HostListener('error')
  onError() {
    this.listingImageUrl = "/assets/images/listings/default_r.png";
    this.setListingDescription();
  }

  constructor() { 
    this.webApiUrl = environment.baseUrl;
  }

  ngOnInit(): void {
    //this.listingImageUrl = "/assets/images/listings/default_r.png";
     this.setListingImageUrl();
  }

  ngOnChanges(): void {
    this.setListingImageUrl();
  }

  setListingImageUrl() {
    if (this.listing.listingImageUrl === undefined || this.listing.listingImageUrl === null ) {
      this.listing.listingImageUrl = this.listingImageUrl; 
    }
    else {
      if (this.listing.listingImageUrl.indexOf("https://") > -1) {
        
      }
      else if (this.listing.listingImageUrl.indexOf("http://") > -1) {
      }
      else {
        let listingImageUrl = this.webApiUrl + ((this.categoryType === "business")? '/ListingsImages/' : "") + this.listing.listingImageUrl + '?noCache=' + Math.random().toString();
        let orgImageUrl = this.listing.listingImageUrl;

        if (this.isFileExist(listingImageUrl) === false) {
          this.listingImageUrl = "/assets/images/listings/default_r.png";
          this.listing.listingImageUrl = this.listingImageUrl; 
          this.listing.defaultImageFlag = true;
        }
        else {
          this.listing.listingImageUrl = listingImageUrl; 
        }
      }
    }
  }

  isFileExist(urlToFile)
  {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if(xhr.status != 200) {
      return false;
    }
    else {
      return true;
    }
  }

  setListingDescription() {
    if (this.listing.description) {
      let a = this.listing.description.replace('\n', '<br>');
      this.listing.description = this.listing.description.replace(/(\r\n|\n|\r)/gm,"");
      this.listing.shortDescription = this.listing.description;
      
    }
  }
}
