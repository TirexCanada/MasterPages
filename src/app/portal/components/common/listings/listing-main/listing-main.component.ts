import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '../../../../../../environments/environment';import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { DateFormatPipe } from '../../../../../shared/pipes/date-format.pipe';
import { DateFormatLongPipe } from '../../../../../shared/pipes/date-format-long.pipe';
import { LineBreaksPipe } from '../../../../../shared/pipes/line-breaks.pipe';
import { ApplicationService } from '../../../../../../app/shared/services/application.service';
import { CustomerService } from '../../../../../../app/shared/services/customer.service';
import { SessionStorageService } from '../../../../../../app/shared/services/session-storage.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { AuthenticationService } from "../../../../../shared/services/authentication.service";
import { MultiLineQuestionComponent } from '../../../../components/generic-components/multi-line-question/multi-line-question.component';
import { OneLineQuestionComponent } from '../../../../components/generic-components/one-line-question/one-line-question.component';
import { IListing } from '../../../../../shared/interfaces/listing.interface';

@Component({
  selector: 'app-listing-main',
  standalone: true, 
  imports: [FormsModule, CommonModule, TranslateModule, MultiLineQuestionComponent, OneLineQuestionComponent, DateFormatLongPipe, LineBreaksPipe],
  providers: [AuthenticationService],
  templateUrl: './listing-main.component.html',
  styleUrls: ['./listing-main.component.css']
})
export class ListingMainComponent implements OnInit {
  @Input() listing: any;
  
  webApiUrl: string;
  listingImageUrl: string = "/assets/images/listings/default_r.png";;

  //popoverContent: string;

  
  @HostListener('error')
  onError() {
    this.listingImageUrl = "/assets/images/listings/default_r.png";
    this.setListingDescription();
  }

  constructor(private location: Location) { 
    this.webApiUrl = environment.baseUrl;
  }

  ngOnInit(): void {
    //this.listingImageUrl = "/assets/images/listings/default_r.png";
    this.setListingImageUrl();
  }

  ngOnChanges(): void {
    //this.listingImageUrl = "/assets/images/listings/default_r.png";
    this.setListingImageUrl();
    this.setListingDescription();
  }

  back() {
    this.location.back();
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
        let listingImageUrl = this.webApiUrl + ((this.listing.businessFlag===true)? '/ListingsImages/' : "") + this.listing.listingImageUrl + '?noCache=' + Math.random().toString();
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

  setListingDescription() {
    this.listing.description = this.listing.description.replace(/(?:\r\n|\r|\n)/g, '<br/>');
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

  fb(e) {
    let url = 'www.google.com';
    e.preventDefault();
    var facebookWindow = window.open(
      'https://www.facebook.com/sharer/sharer.php?u='+ "https://classifiedportal.azurewebsites.net/#/portal/listing/6275ea94-0d55-46a5-afa8-247ab77a541f",
      'facebook-popup',
      'height=350,width=600'
    );
    if (facebookWindow.focus) {
      facebookWindow.focus();
    }
    return false;
  }
}
