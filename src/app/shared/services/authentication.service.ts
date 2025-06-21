import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { ApplicationService } from './application.service';
import { EndpointsService } from './endpoints.service';
import { SessionStorageService } from './session-storage.service';
import { ICustomer } from "../interfaces/customer.interface";
import { ILogin } from "../interfaces/login.interface";


@Injectable()
export class AuthenticationService {
    currentCustomer!: ICustomer;

    constructor(private httpClient: HttpClient,
        private applicationService: ApplicationService,
        private endpointsService: EndpointsService,
        private sessionStorageService: SessionStorageService) { 
    }

    login(login: ILogin): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getLogin(), login);
    }

    unlockCustomer(model: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUnlockCustomer(), model);
    }

    templogin(login: ILogin): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getTempLogin(), login);
    }

    
    verifyEmail(emailRequestModel: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getVerifyEmail(), emailRequestModel);
    }

    verifyCode(emailRequestModel: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getVerifyCode(), emailRequestModel);
    }

    logout() {
        this.sessionStorageService.setCurrentCustomer(null);
        this.sessionStorageService.setAuthHeader(""); 
        this.sessionStorageService.setShoppingCart(null);
    }

    adminLogout() {
        this.sessionStorageService.setCurrentAdmin(null);
        this.sessionStorageService.setAuthHeader(""); 
    }

    getLoggedCustomer()  {
        return this.sessionStorageService.getCurrentCustomer();
    }
}