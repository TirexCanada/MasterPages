import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
/* import * as _ from 'lodash'; */

import { environment } from '../../../environments/environment';

import { ApplicationService } from '../../shared/services/application.service';
import { ClassifiedService } from '../../shared/services/classified.service';
import { SessionStorageService } from '../../shared/services/session-storage.service';
import { SupportService } from '../../shared/services/support.service';


@Injectable({
    providedIn: 'root' // This makes _PortalService available throughout the application
  })
  
export class PortalService {
    constructor(public httpClient: HttpClient,
        public router: Router,
        public sessionStorageService: SessionStorageService,
        public supportService: SupportService,
        public applicationService: ApplicationService,
        public classifiedService: ClassifiedService) { 
    }

    getCategories() {
        let baseRequest = { "requestModelType": "classifiedCategories" }
        this.classifiedService.getCategories(baseRequest).subscribe( response => {
            let categories = response;
            categories.map ((x: any) => {
                x.code = x.id;
                x.text = x.categoryName;
                x.subcategoriesInformation.map ((s: any) => {
                    s.code = s.id;
                    s.text = s.categoryName;
                })
            })
            this.sessionStorageService.setCategories(categories);
        })
    }
    
    getFaqs() {
        let baseRequest = { "requestModelType": "faqs" }
        this.supportService.getFaqs(baseRequest).subscribe( response => {
          let faqs = response.filter((x:any) => x.showFlag === true);
          //faqs = _.sortBy(response, "sortOrder"); 
          this.sessionStorageService.setFaqs(faqs);
        })
    }

    getTags() {
        let baseRequest = { "requestModelType": "tags" }
        this.supportService.getTags(baseRequest).subscribe( response => {
          //let tags = response.filter((x:any) => x.showFlag === true);
          let tags = response;
          //tags = _.sortBy(response, "sortOrder"); 
          this.sessionStorageService.setTags(tags);
        })
    }

    getFaqCategories() {
        let baseRequest = { "requestModelType": "faqCategories" }
        this.supportService.getFaqCategories(baseRequest).subscribe( response => {
          let faqCategories = response.filter((x:any) => x.showFlag === true);
          //faqCategories = _.sortBy(response, "sortOrder"); 
          this.sessionStorageService.setFaqCategories(faqCategories);
        })
    }

    getActiveBanners() {
        let baseRequest = { "requestModelType": "topActiveBanners" }
        this.classifiedService.getActiveBanners(baseRequest).subscribe( response => {
            let banners = response;
            this.sessionStorageService.setActiveBanners(banners);
        })
    }

    getContentList() {
        let baseRequest = { "requestModelType": "content" }
        this.supportService.getContentList(baseRequest).subscribe( response => {
            let contentList = response;
            this.sessionStorageService.setContentList(contentList);
        })
    }

    getLocations() {
        let baseRequest = { "requestModelType": "locations" }
        this.supportService.getLocations(baseRequest).subscribe( response => {
            let locations = response;
            this.sessionStorageService.setLocations(locations);
        })
    }
    

   /*  getEmailSettings() {
        let sectionRequest = {"sectionName": ""};
        this.applicationService.getEmailSettings(sectionRequest).subscribe( response => {
            let emailSetting = response;
            this.sessionStorageService.setEmailSettings(emailSetting);
        })
    } */
}
