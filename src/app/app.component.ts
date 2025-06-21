import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, RouterEvent, ActivatedRoute, NavigationEnd } from '@angular/router';
//import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
//import { GoogleMapsModule } from '@angular/google-maps'

//import { appRouter } from './app.routing';


import { NgModule, ApplicationRef, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LOCATION_INITIALIZED, DOCUMENT } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { PortalService } from './portal/services/portal.service';
import { SessionStorageService } from './shared/services/session-storage.service';
import { SeoService } from './shared/services/seo.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'ClassifiedPortal';
  destroyed = new Subject<any>();
  
  constructor(
    private portalService: PortalService,
    private sessionStorageService: SessionStorageService,
    private seoService: SeoService,
    translate: TranslateService
  ) {
      translate.setDefaultLang('en');

     /*  this.router.events.pipe(
        //filter((event: RouterEvent) => event instanceof NavigationEnd),
        takeUntil(this.destroyed)
      ).subscribe(data => { */
      
     /*    let seoData = data['seo'];
        this.seoService.updateTitle(seoData['title']);
        this.seoService.updateMetaTags(seoData['metaTags']); */

        //this.portalService.getEmailSettings();
        this.portalService.getCategories();
        this.portalService.getFaqs();
        this.portalService.getFaqCategories();
        this.portalService.getTags();
        this.portalService.getActiveBanners();
        this.portalService.getContentList();
      //});
  }

  ngOnInit() {
    this.loadGoogleMapsApi();
  }

  loadGoogleMapsApi(): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
  
  ngOnDestroy(): void {
   /*  this.destroyed.next();
    this.destroyed.complete(); */
  }   
    
}
