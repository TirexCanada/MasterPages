import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ApplicationService } from './application.service';
import { AuthenticationService } from './authentication.service';
import { ApiInterceptorService } from './api-interceptor.service';
import { EndpointsService } from './endpoints.service';
import { SessionStorageService } from './session-storage.service';

import { ILogin } from "../interfaces/login.interface";
import { ICustomer } from "../interfaces/customer.interface";
import { IListing } from "../interfaces/listing.interface";
import { IListingTag } from "../interfaces/listing-tag.interface";

@Injectable()
export class CustomerService {

    constructor(private httpClient: HttpClient,
        private applicationService: ApplicationService,
        private authenticationService: AuthenticationService,
        public endpointsService: EndpointsService,
        private sessionStorageService: SessionStorageService,
        private apiInterceptorService: ApiInterceptorService) 
    { }

    login(login: ILogin): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getLogin(), login);
    }

    changePassword(login: ILogin): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getChangePassword(), login);
    }

    updatePassword(login: ILogin): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdatePassword(), login);
    }

    requestPassword(login: ILogin): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getRequestPassword(), login);
    }

    lockCustomer(login: ILogin): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getLockCustomer(), login);
    }

    getCurrentCustomer(): Observable<ICustomer>  {
      let loggedCustomer = this.authenticationService.getLoggedCustomer();
      let customerModel = {
        "id": "1" //loggedCustomer.id 
        };
      return this.httpClient.post(this.endpointsService.getGetCustomer(), customerModel); 
    }

    getCustomerForAdmin(id: string): Observable<ICustomer>  {
        let customerModel = {"id": id };
        return this.httpClient.post(this.endpointsService.getGetCustomerForAdmin(), customerModel);
    }

    getCustomers(baseRequestModel: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetCustomers(), baseRequestModel);
    }

    createCustomer(customer: ICustomer): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getCreateCustomer(), customer);
    }

    updateCustomer(customer: ICustomer): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateCustomer(), customer);
    }
    
    deleteCustomer(customer: ICustomer): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getDeleteCustomer(), customer);
    }

    updateListing(listing: IListing): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateListing(), listing);
    }

    updateListingContact(listing: IListing): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateListingContact(), listing);
    }

    updateListingTags(listingTags: IListingTag []): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateListingTags(), listingTags);
    }

    updateListingStatus(listing: IListing): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateListingStatus(), listing);
    }

    updateListingActiveFlag(listing: IListing): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateListingStatus(), listing);
    }

    deleteListing(listing: IListing): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getDeleteListing(), listing);
    }

    resetCustomerResponses(baseRequestModel: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getResetCustomerResponses(), baseRequestModel);
    }

    uploadFiles(request: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUploadFiles(), request);
    }

    uploadImage(formData: any, options: any) {
        return this.httpClient.post(this.endpointsService.getUploadImage(), formData, options);
    }

    uploadListingImage(formData: any, options: any) {
        return this.httpClient.post(this.endpointsService.getUploadListingImage(), formData, options);
    }

    getCustomerListings(baseRequestModel: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetCustomerListings(), baseRequestModel);
    }
      
    sendCustomerEmail(emailModel: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getSendCustomerEmail(), emailModel);
    }

    createCustomerRequest(customerRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getCreateCustomerRequest(), customerRequest);
    }

   

    getCustomerFullName(customer: ICustomer) {
      return (customer !== null)? ((customer.firstName)? (customer.firstName + " " + customer.lastName) : customer.email) : "";
    }

    getCustomerLegalName(customer: ICustomer) {
        return (customer !== null)? (customer.firstName + " " + customer.lastName) : "";
    }

    buildCustomerModel(customer: ICustomer) {
        let customerModel = JSON.parse(JSON.stringify(customer));
        /*   customerModel.legalName = { "firstName": customer.firstName, "lastName": customer.lastName, "middleName": customer.middleName, "dob": customer.dob, "birthNameFlag": null }
        customerModel.spouseLegalName = { firstName: customer.spouseFirstName, "lastName": customer.spouseLastName, "middleName": customer.spouseMiddleName, "dob": customer.spouseDob, "birthNameFlag": null }
        
        //Convert all dates
        this.convertDates(customerModel);  */
        
        return customerModel;
    }   

    adjustCustomerData(customer: any, model: any, resetChildren: boolean) {
        //this.adjustDates(customer, model);
        /*  this.adjustLegalInformation(customer, model);
        this.adjustEmptyObjects(customer, resetChildren); */
    }

    convertDate(date: any) {
        if (date !== null && date !== undefined)
        {
            return { day: (new Date(date)).getDate(), month: (new Date(date)).getMonth() + 1, year: (new Date(date)).getFullYear() };
        }
        else {
            return null;
        }
    }

    convertDates(customer: any) {
        //Legal Information
        customer.legalName.dob = this.convertDate(customer.legalName.dob);
        customer.spouseLegalName.dob = this.convertDate(customer.spouseLegalName.dob);
    }
}