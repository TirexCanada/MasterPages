import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { ApplicationService } from './application.service';
import { EndpointsService } from './endpoints.service';
import { SessionStorageService } from './session-storage.service';
import { IAdmin } from "../interfaces/admin.interface";
import { ILogin } from "../interfaces/login.interface";


@Injectable()
export class AdminService {
    currentAdmin!: IAdmin;

    constructor(private httpClient: HttpClient,
        private applicationService: ApplicationService,
        private endpointsService: EndpointsService,
        private sessionStorageService: SessionStorageService) { 
    }

    changeAdminPassword(login: ILogin): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getChangeAdminPassword(), login);
    }

    getAdmins(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetAdmins(), baseRequestModel);
    }

    updateAdmin(admin: IAdmin): Observable<any> {
        return this.httpClient.post(this.endpointsService.getUpdateAdmin(), admin);
    }

}