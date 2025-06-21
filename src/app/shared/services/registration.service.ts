import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EndpointsService } from './endpoints.service';
import { ICustomerRegistration } from "../interfaces/customer-registration.interface";


@Injectable()
export class RegistrationService {

    constructor(public httpClient: HttpClient,
                public endpointsService: EndpointsService
    ) { }

    createCustomer(customer: ICustomerRegistration): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getCreateCustomer(), customer);
    }

    public validateCustomer(customer: ICustomerRegistration): Observable<any> {
        return this.httpClient.post(this.endpointsService.getValidateCustomer(), customer);
    }

    public getCustomers(): Observable<any> {
        return this.httpClient.get(this.endpointsService.getGetCustomers());
    }

    createCustomerRequest(customer: ICustomerRegistration): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getCreateCustomerRequest(), customer);
    }

    processCustomerSubscriptionRequest(customer: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getProcessCustomerSubscriptionRequest(), customer);
    }
}