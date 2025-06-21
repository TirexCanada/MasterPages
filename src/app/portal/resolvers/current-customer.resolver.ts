import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { SessionStorageService } from '../../shared/services/session-storage.service';

@Injectable({
    providedIn: 'root'
  })
export class CurrentCustomerResolver implements Resolve<any> {
    customer: any;

    constructor(private sessionStorageService: SessionStorageService) { }

    resolve (): Observable<any> | Promise<any> | any {
        return this.sessionStorageService.getCurrentCustomer();
    }
}
