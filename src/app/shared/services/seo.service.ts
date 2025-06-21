import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import { ApplicationService } from './application.service';
import { AuthenticationService } from './authentication.service';
import { EndpointsService } from './endpoints.service';
import { SessionStorageService } from './session-storage.service';

import { ILogin } from "../interfaces/login.interface";
import { ICustomer } from "../interfaces/customer.interface";
import { IListing } from "../interfaces/listing.interface";
import { IListingTag } from "../interfaces/listing-tag.interface";

@Injectable({
    providedIn: 'root'
  })

export class SeoService {

    constructor(private title: Title, private meta: Meta) { }
    
    updateTitle(title: string){
        this.title.setTitle(title);
    }

    updateMetaTags(metaTags: MetaDefinition[]){
        metaTags.forEach(m=> this.meta.updateTag(m));
    }
}

