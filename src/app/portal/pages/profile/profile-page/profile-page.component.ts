import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';  
import { DisableDirective } from '../../../../../app/shared/directives/disable.directive';

import { InterceptorMetaOptions } from '../../../../../app/shared/classes/interceptor-meta-options';
import { ApplicationService } from '../../../../../app/shared/services/application.service';
import { CustomerService } from '../../../../../app/shared/services/customer.service';
import { SessionStorageService } from '../../../../../app/shared/services/session-storage.service';
import { NavigationService } from '../../../../../app/shared/services/navigation.service';
import { AuthenticationService } from "../../../../shared/services/authentication.service";
import { ProfileInfoComponent } from '../../../components/profile/profile-info/profile-info.component';
import { ContactInfoComponent } from '../../../components/profile/contact-info/contact-info.component';
import { SocialProfilesComponent } from '../../../components/profile/social-profiles/social-profiles.component';

import { ICustomer } from '../../../../../app/shared/interfaces/customer.interface';
import { IListing } from '../../../../../app/shared/interfaces/listing.interface';
import { IMessage } from '../../../../../app/shared/interfaces/message.interface';
//import { TheIssuesPreviewComponent } from 'src/app/shared/components/preview/form17a/the-issues-preview/the-issues-preview.component';

@Component({
  selector: 'app-profile-page',
  standalone: true, 
  providers: [ApplicationService, NavigationService, SessionStorageService, CustomerService, AuthenticationService],
  imports: [TranslateModule, CommonModule, ProfileInfoComponent, ContactInfoComponent, SocialProfilesComponent, FormsModule, DisableDirective],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  currentCustomer: ICustomer;
  model: ICustomer;
  listings: IListing [];
  orgModel: ICustomer;
  customerModel: any;
  validationData: any;
  form: NgForm;
  section: string;
  defaultCountry: string;
  serverErrors: IMessage [];
  isDisabled: any = { "profile": true, "contact": true, "socialProfiles": true, "business-image": true, "profile-image": true };
  submitted: boolean = false;
  profileUrl: any;
  businessUrl: any;
  fileToUpload: any;
  webApiUrl: string;
  errorMessage: string = "";

  showNavigationButtons: boolean = false;

  destroyed = new Subject<any>();
  
  @ViewChild('profileForm', { static: true }) profileForm: NgForm;

  @HostListener('error')
    onError() {
      this.profileUrl = "/assets/images/profile/business.jpg";
    }
  

  constructor( private location: Location,
    private activatedRoute: ActivatedRoute,
    private applicationService: ApplicationService,
    private navigationService: NavigationService,
    private customerService: CustomerService,
    private sessionStorageService: SessionStorageService) { 
      this.activatedRoute.queryParams.subscribe(params => {
        this.currentCustomer = this.sessionStorageService.getCurrentCustomer();
        this.getCustomerData();
      });
    }

  ngOnInit() {
    this.validationData = this.applicationService.getValidationData();
    this.form = this.profileForm;
    this.section = "profile";
    this.defaultCountry = "Canada";
    this.model = JSON.parse(JSON.stringify(this.currentCustomer));
    this.orgModel = JSON.parse(JSON.stringify(this.currentCustomer));
    this.webApiUrl = environment.baseUrl;

    this.businessUrl = this.webApiUrl + "/ProfileImages/c9f03a18-9d80-4d97-bd3d-3c94a6d01fbe/" + this.currentCustomer?.id + "/business.jpg";
    if (this.isFileExist(this.businessUrl) === false) {
      this.businessUrl = "'/assets/images/profile/business.jpg'";
    }

    this.profileUrl = this.webApiUrl + "/ProfileImages/c9f03a18-9d80-4d97-bd3d-3c94a6d01fbe/" + this.currentCustomer?.id + "/profile.jpg";
    if (this.isFileExist(this.profileUrl) === false) {
      this.profileUrl = "'/assets/images/profile/profile.jpg'";
    }

    if (this.model?.customerContactInformation === null || this.model?.customerContactInformation === undefined) {
      if (this.model !== null && this.model !== undefined) {
        this.model.customerContactInformation = { "customerId": this.currentCustomer?.id };
      }
    }

    if (this.model?.customerSocialProfilesInformation === null || this.model?.customerSocialProfilesInformation === undefined) {
      if (this.model !== null && this.model !== undefined) {
        this.model.customerSocialProfilesInformation = { "customerId": this.currentCustomer?.id };
      }
    }

    this.isDisabled['profile'] = true;
  }

  goBack() {
    this.location.back();
  }

  getCurrentCustomer() {
    this.activatedRoute.data.subscribe(data => {
      this.currentCustomer = data["currentCustomer"];
    });
  }

  getCustomerData() {
    let baseRequestModel = { "CustomerId": this.currentCustomer?.id}
    this.customerService.getCustomerListings(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );      
  }

  getOnSuccess(response: any): void {
    this.listings = response.listings;
  }

  private getOnError(response: any): void {
    //TODO
  }

  editClick(type: string) {
    this.isDisabled[type] = false;
  }

  saveClick(type: string) {
    this.submitted = true;
    let customer: any;
    if (type === "business-image" || type === "profile-image") {
      this.model.updateSection = type;
      customer = JSON.parse(JSON.stringify(this.model)); 
      
      const formData: FormData = new FormData();
      formData.append("Image", this.fileToUpload, this.fileToUpload['name']);
      formData.append("CustomerId", customer.id);
      formData.append("Type", type.substring(0, type.indexOf("-")));

      let options = {
        headers: {
          meta: [new InterceptorMetaOptions(false, true, false)]
        }
      };

      this.customerService.uploadImage(formData, options).pipe(
        takeUntil(this.destroyed)
      ).subscribe(
        data => {
          this.isDisabled[type] = true;
        })
    }
    else {
      if (this.validateForm(this.model, type)) {
        this.errorMessage = "";
        this.model.updateSection = type;
        customer = JSON.parse(JSON.stringify(this.model)); 
        
        this.customerService.updateCustomer(customer).pipe(
          takeUntil(this.destroyed)
        ).subscribe(
          response => this.updateCustomerOnSuccess(response, type),
          response => this.updateCustomerOnError(response)
        );
      }
      else {
        this.errorMessage = "Please fill in all the required fields."
      }
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

  validateForm(model: ICustomer, type: string) {
    let validate = true;

    switch(type) {
      case "profile":
        if (model.accountName === null || model.accountName === undefined || model.accountName.trim() === "") {
          return false;
        }

        // if (model.firstName === null || model.firstName === undefined || model.firstName.trim() === "") {
        //   return false;
        // }

        // if (model.lastName === null || model.lastName === undefined || model.lastName.trim() === "") {
        //   return false;
        // }
        break;
      case "contact":
        // if (model.customerContactInformation === null 
        //   || model.customerContactInformation === undefined 
        //   || model.customerContactInformation.phoneNumber === null 
        //   || model.customerContactInformation.phoneNumber === undefined 
        //   || model.customerContactInformation.phoneNumber.trim() === "") {
        //   return false;
        // }
        break;
      case "business-image":
        return true;
        break;
    }

    return validate;
  }

  onSubmit() {
  }


  onSelectFile(event, type) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.fileToUpload = event.target.files[0];

      reader.onload = (event) => { // called once readAsDataURL is completed
        if (type === "business-image") {
          this.businessUrl = event.target.result;
        }
        else if (type === "profile-image") {
          this.profileUrl = event.target.result;
        }
      }
    } 

    this.isDisabled[type] = false;
  }

 
  backToPortal() {
    this.navigationService.navigateToHome();
  }

  goToListings() {
    this.navigationService.navigateToMyListings();
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

  ngOnDestroy() { 
    //this.destroyed.next();
    this.destroyed.complete();
  }
}
