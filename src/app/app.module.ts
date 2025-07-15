import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LOCATION_INITIALIZED } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
// import { GoogleMapsModule } from '@angular/google-maps'
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PortalModule } from './portal/portal.module';
//import { SharedModule } from "../../src/app/shared/shared.module";
import { CommonModule } from '@angular/common';

import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { provideHttpClient, HttpClient, HttpBackend, HttpClientModule, withFetch } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ApplicationService } from './shared/services/application.service';
import { PortalService } from './portal/services/portal.service';
import { LoaderService } from './shared/services/loader.service';
import { SupportService } from './shared/services/support.service';
import { ClassifiedService } from './shared/services/classified.service';
import { EndpointsService } from './shared/services/endpoints.service';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Step 1: Import RouterModule
import { ApiInterceptorService } from './shared/services/api-interceptor.service';
import { ErrorInterceptorService } from './shared/services/error-interceptor.service';  
import { UtilService } from './shared/services/util.service';


export function appInitializerFactory(applicationService: ApplicationService, translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {

    applicationService.getConfigurations();
    setTimeout(() => {
      resolve(null);
    }, 3000);


   /*  const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then((res: any) => { */

    applicationService.configureLanguageData();

     /*  const langToSet = "en";

      translate.use(langToSet).subscribe(() => {
        // console.info(`Successfully initialized '${langToSet}' language.'`);
      }, err => {
        // console.error(`Problem with '${langToSet}' language initialization.'`);
      }, () => {
        resolve(null);
      }); */
    }); 
  //});
}

/* 
export function appInitializerFactory(injector: Injector, http: HttpClient) {
    return () => new Promise<any>((resolve: any) => {
      const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
      return locationInitialized.then(() => {
        // Perform initialization tasks, e.g., load settings from a server
        // or set the application's language based on the user's location.
      });
    });
  } */


export function HttpLoaderFactory(http: HttpClient) {
  //return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule, 
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    PortalModule,
    //SharedModule,
    FormsModule,
    ReactiveFormsModule,
   
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useFactory: HttpLoaderFactory
      }
    }),
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useFactory: HttpLoaderFactory
      }
    }),
    NgbModule
  ],
  exports: [
    TranslateModule, 
    CommonModule
  ],
  providers: [
    ApplicationService,
    PortalService,
    SupportService,
    ClassifiedService,
    LoaderService,
    ApiInterceptorService,
    ErrorInterceptorService,
    UtilService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [ApplicationService, Injector, HttpClient],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
