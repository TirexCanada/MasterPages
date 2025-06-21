import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { ApplicationService } from './application.service';
import { EndpointsService } from './endpoints.service';
import { SessionStorageService } from './session-storage.service';
import { IAdmin } from "../interfaces/admin.interface";
import { ILogin } from "../interfaces/login.interface";


@Injectable()
export class AdminAuthenticationService {
    currentAdmin!: IAdmin;

    constructor(private httpClient: HttpClient,
        private applicationService: ApplicationService,
        private endpointsService: EndpointsService,
        private sessionStorageService: SessionStorageService) { 
    }

    login(login: ILogin): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getAdminLogin(), login);
    }

    logout() {
        this.sessionStorageService.setCurrentAdmin(null);
        this.sessionStorageService.setAuthHeader(""); 
    }

    getLoggedAdmin() {
        return this.sessionStorageService.getCurrentAdmin();
    }
}