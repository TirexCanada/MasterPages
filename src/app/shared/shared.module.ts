import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
/* import { FileUploadModule } from "ng2-file-upload"; */

import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
/* 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; */


import { ApiInterceptorService } from './services/api-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { AdminService } from './services/admin.service';
import { ApplicationService } from './services/application.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard } from './services/authentication.guard';
import { AdminAuthenticationService } from './services/admin-authentication.service';
import { AdminAuthenticationGuard } from './services/admin-authentication.guard';
import { ClassifiedService } from './services/classified.service';
import { CustomerService } from './services/customer.service';
import { EndpointsService } from './services/endpoints.service';
import { NavigationService } from './services/navigation.service';
import { RegistrationService } from './services/registration.service';
import { SessionStorageService } from './services/session-storage.service';
import { SeoService } from './services/seo.service';
import { SupportService } from './services/support.service';
import { UtilService } from './services/util.service';
import { WindowRefService } from './services/window-ref.service';


export function init(applicationService: ApplicationService) {
    return () => applicationService.getConfigurations();
  }

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        TranslateModule,
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: init, deps: [ApplicationService], multi: true }, 
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
        AdminService,
        ApplicationService,
        AuthenticationService,
        AuthenticationGuard,
        AdminAuthenticationService,
        AdminAuthenticationGuard,
        ClassifiedService,
        CustomerService,
        EndpointsService,
        NavigationService,
        RegistrationService,
        SessionStorageService,
        SupportService,
        SeoService,
        UtilService,
        WindowRefService,
   
        CurrencyPipe,
        TitleCasePipe,
        
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
       
       
    ],
    declarations: [
      
    ]
})
export class SharedModule { }