import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
/* import { NgxPrintModule } from 'ngx-print'; */
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 
import { ApplicationService } from '../shared/services/application.service';
import { ApiInterceptorService } from '../shared/services/api-interceptor.service';
import { ErrorInterceptorService } from '../shared/services/error-interceptor.service';  
import { portalRouter } from './portal.routing';

//import { SharedModule } from "../../../src/app/shared/shared.module";

import { PortalHeaderComponent } from './components/navigation/portal-header/portal-header.component';
import { PortalFooterComponent } from './components/navigation/portal-footer/portal-footer.component';

// import { CarouselComponent } from './components/common/carousel/carousel.component';
// import { TestimonialsComponent } from './components/common/testimonials/testimonials.component';
// import { LatestNewsComponent } from './components/common/latest-news/latest-news.component';
// import { RealtorComponent } from './components/common/realtor/realtor.component';
// import { NewsComponent } from './pages/news/news.component';
// import { ContactComponent } from './pages/contact/contact.component';
// import { ContactFormComponent } from './components/common/contact-form/contact-form.component';
// import { FeaturedListComponent } from './components/common/featured-list/featured-list.component';
// import { ListingComponent } from './pages/listing/listing.component';
// import { BackToTopComponent } from './components/navigation/back-to-top/back-to-top.component';
// import { AllNewsComponent } from './components/common/all-news/all-news.component';

export function HttpLoaderFactory(http: HttpClient) {
    //return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
    return new TranslateHttpLoader(http);
}


export function init(applicationService: ApplicationService) {
  return () => applicationService.getConfigurations();
}
  
@NgModule({
    declarations: [
    /*   PortalHeaderComponent,
      PortalFooterComponent */


      //HomeComponent,
        // PortalComponent,
         
        // CarouselComponent,
        // TestimonialsComponent,
        // LatestNewsComponent,
        // RealtorComponent,
        // NewsComponent,
        // ContactComponent,
        // ContactFormComponent,
        // FeaturedListComponent,
        // ListingComponent,
        // BackToTopComponent,
        // AllNewsComponent
    ],
    imports: [
        CommonModule,   
        HttpClientModule,
        HttpClientJsonpModule,
        portalRouter,
        RouterModule,
        //SharedModule,
        FormsModule,
        TranslateModule.forChild({
            defaultLanguage: 'en',
            loader: {
              provide: TranslateLoader,
              deps: [HttpClient],
              useFactory: HttpLoaderFactory
            }
          })
    ],
    providers: [
      { provide: APP_INITIALIZER, useFactory: init, deps: [ApplicationService], multi: true },
      //{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true },
      //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    ],
    exports: [TranslateModule,

    /*   PortalHeaderComponent,
      PortalFooterComponent */

        //CommonModule,
        //RouterModule
    ],
})
export class PortalModule { }
