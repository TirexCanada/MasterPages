import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EndpointsService } from './endpoints.service';

import { IListing } from '../interfaces/listing.interface';
import { ICategory } from '../interfaces/category.interface';

@Injectable()
export class ClassifiedService {

    constructor(public httpClient: HttpClient,
        public endpointsService: EndpointsService
    ) { }

    //Categories
    getCategories(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetCategories(), baseRequest);
    }

     //CategoriesCounts
     getCategoriesCounts(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetCategoriesCounts(), baseRequest);
    }

    //Top Listings
    getTopListings(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetTopListings(), baseRequest);
    }

    //Top Classified Listings
    getTopClassifiedListings(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetTopClassifiedListings(), baseRequest);
    }

    //Listings
    getListingsByTagId(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetListingsByTagId(baseRequest), baseRequest);
    }

    //Top Priority Listings
    getTopPriorityListings(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetTopPriorityListings(), baseRequest);
    }

    //Top Classified Priority Listings
    getTopClassifiedPriorityListings(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetTopClassifiedPriorityListings(), baseRequest);
    }

    //Listing
    getListing(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetListing(), baseRequest);
    }

     //Listing
     getListingsByParams(params: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetListingsByParams(params), params);
    }

    //Listing
    updateListingHits(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateListingHits(), baseRequest);
    }

    //Active Banners
    getActiveBanners(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetActiveBanners(), baseRequest);
    }

    //CurrentMaketingCampaign
    getCurrentMarketingCampaign(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetCurrentMarketingCampaign(), baseRequest);
    }
    
}