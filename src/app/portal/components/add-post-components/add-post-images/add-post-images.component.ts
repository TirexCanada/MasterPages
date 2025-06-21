import { Component, OnInit, OnChanges, Input, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  

import { SessionStorageService } from '../../../../../app/shared/services/session-storage.service';
import { ClassifiedService } from '../../../../../app/shared/services/classified.service';
import { InterceptorMetaOptions } from '../../../../../app/shared/classes/interceptor-meta-options';
import { ApplicationService } from '../../../../../app/shared/services/application.service';
import { CustomerService } from '../../../../../app/shared/services/customer.service';
import { NavigationService } from '../../../../../app/shared/services/navigation.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

import { ICustomer } from '../../../../../app/shared/interfaces/customer.interface';
import { ICategory } from '../../../../../app/shared/interfaces/category.interface';
import { IListing } from '../../../../../app/shared/interfaces/listing.interface';
import { IMessage } from '../../../../../app/shared/interfaces/message.interface';

@Component({
  selector: 'app-add-post-images',
  standalone: true, 
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './add-post-images.component.html',
  styleUrls: ['./add-post-images.component.css']
})
export class AddPostImagesComponent implements OnInit {
  categories: ICategory [];
  
  @Input() currentCustomer: ICustomer;
  @Input() model: IListing;
  @Input() mode: string;
  @Input() form: NgForm;
  @Input() submitted: boolean;

  orgModel: ICustomer;
  customerModel: any;
  validationData: any;
  section: string;
  serverErrors: IMessage [];
  showNavigationButtons: boolean = false;
  isDisabled: any = { "listing-image": true };
  listingUrl: any;
  fileToUpload: any;
  webApiUrl: string;
  errorMessage: string = "";

  destroyed = new Subject<any>();

  @HostListener('error')
  onError() {
    this.listingUrl = "/assets/images/listings/default_s.png";
  }


  constructor(private sessionStorageService: SessionStorageService,
    private classifiedService: ClassifiedService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.webApiUrl = environment.baseUrl;

    if (this.mode === "add") {
      this.listingUrl = "'/assets/images/listings/default_s.png'";
    }
    else {
      this.listingUrl = this.webApiUrl + "/ProfileImages/c9f03a18-9d80-4d97-bd3d-3c94a6d01fbe/" + this.currentCustomer.id + "/Listings/" + this.model?.id + "/listing.jpg";
      if (this.isFileExist(this.listingUrl) === false) {
        this.listingUrl = "'/assets/images/listings/default_s.png'";
      }
    }
  }

  editClick(type: string) {
    this.isDisabled[type] = false;
  }

  saveClick(type: string) {
    this.submitted = true;
    let listing: any;
    if (type === "listing-image") {
      //this.model.updateSection = type;
      listing = JSON.parse(JSON.stringify(this.model)); 
      
      const formData: FormData = new FormData();
      formData.append("Image", this.fileToUpload, this.fileToUpload['name']);
      formData.append("CustomerId", this.currentCustomer.id);
      formData.append("ListingId", listing.id);
      formData.append("Type", type.substring(0, type.indexOf("-")));

      let options = {
        headers: {
          meta: [new InterceptorMetaOptions(false, true, false)]
        }
      };

      this.customerService.uploadListingImage(formData, options).pipe(
        takeUntil(this.destroyed)
      ).subscribe(
        data => {
          this.isDisabled[type] = true;
        })
    }
  }

  cancelClick(type: string) {
    this.submitted = false;
    this.model = this.orgModel;
    this.isDisabled[type] = true;
  }

  private updateCustomerOnSuccess(response: any, type: string): void {
    this.submitted = false;
    this.isDisabled[type] = true;
    this.sessionStorageService.setCurrentCustomer(response);
    //this.serverErrors.push({ "isSuccess": true, "code": "1", "message": "", "displayMessage": "Your information had been updated successfully. Please, click the Back button below to return back to Your Personal Portal." });
  }
  
  private updateCustomerOnError(response: any): void {
    this.submitted = false;
    this.serverErrors = response; 
  }

  onSelectFile(event, type) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.fileToUpload = event.target.files[0];

      reader.onload = (event) => { // called once readAsDataURL is completed
        if (type === "listing-image") {
          this.listingUrl = event.target.result;
        }
      }
    } 

    this.isDisabled[type] = false;
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
}
