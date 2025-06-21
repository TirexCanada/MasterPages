import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject,  BehaviorSubject, throwError, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { shareReplay } from 'rxjs/operators';

import { EndpointsService } from './endpoints.service';
import { WindowRefService } from './window-ref.service';
import { SessionStorageService } from './session-storage.service';

/* import { AddressPipe } from '../filters/address.pipe';
import { FullNamePipe } from '../filters/full-name.pipe';
import { ResidentAddressPipe } from '../filters/resident-address.pipe'; */
//import {LoginName} from '../filters/login-name.pipe';

import { PROVINCES } from '../constants/app-constants';
import { MONTHS } from '../constants/app-constants';


@Injectable({
    providedIn: 'root'
})

export class ApplicationService {
  private configUrl = 'assets/config/application.json';
  private configSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private config$: Observable<any>;


    public appName: string = '';

    public validationsObject: any;
    public contentObject: any;
    public globalConfigurations: any;
    public currentUser: any;

    canadianProvinces!: any[];
    resideOptions!: any[];
    employmentOptions!: any[];

    private currentLanguage: string = 'en'; // Default language
    languageChanged: EventEmitter<string> = new EventEmitter<string>();
    private languageSubject: Subject<string> = new Subject<string>();
  
   
    constructor(public httpClient: HttpClient,
        private sanitizer: DomSanitizer,
        public endpointsService: EndpointsService,
        public windowRef: WindowRefService,
        public sessionStorage: SessionStorageService,
        /* private addressPipe: AddressPipe,
        private fullNamePipe: FullNamePipe,
        private ResidentAddressPipe: ResidentAddressPipe, */
        //private loginNamePipe:LoginName,
        public translateService: TranslateService) { 
            this.config$ = this.httpClient.get(this.configUrl).pipe(
                shareReplay(1) // Ensure the request is shared and replayed to new subscribers
            );
            this.config$.subscribe(this.configSubject); // Subscribe to the observable and update the subject
    }

    getConfig(): Observable<any> {
        return this.configSubject.asObservable();
    }

    getConfigurations(): Promise<any> {
        const promise = this.httpClient.get('assets/config/application.json')
            .toPromise()
            .then((settings: any) => {
                this.endpointsService.setEndpoints(settings.endpoints);
                this.setValidationData(settings);
                this.setContentData(settings);
                this.setGlobalConfigurations(settings);
                return settings;
            });

        return promise;
    }

    setGlobalConfigurations(settings: any) {
        this.globalConfigurations = settings.config;
    }

    getGlobalConfigurations() {
        return this.globalConfigurations || {};
    }

    setValidationData(settings: any) {
        this.validationsObject = settings.validations;
        this.sessionStorage.setValidationData(this.validationsObject);
    }
    
    getValidationData() {
        return this.sessionStorage.getValidationData() || {};
    }

    setContentData(settings: any) {
        this.contentObject = settings.content;
    }
    
    getContentData() {
        return this.contentObject || {};
    }

   

    

    //---------------------------------------
    ngOnDestroy() {
        //this.currentLobSubject.unsubscribe();
    }


   /*  getMonthName(code: string): string {
        let months = MONTHS;
        return months.find(x => x.code === code.toString()).text;
    }
 */
    getDaysLeft(endDate: any) {
        if (endDate) {
            const d = new Date(endDate);
            const timeDiff = Math.abs(Date.now() - d.getTime() );
            return Math.floor(timeDiff / (1000 * 3600 * 24));
        }
        else {
            return "";
        }
    }

    //Full Name
    getFullName(legalName: any) {
        //return this.fullNamePipe.transform(legalName);
        return legalName;
    }
   
    //
    getEmail(email:any) {
        //return this.loginNamePipe.transform(email);
        return email;
    }

    getCustomerName(firstName: string, lastName: string) {
        return firstName + " " + lastName;
    }

    //Build LegalName
    buildLegalName(firstName: string, middleName: string, lastName: string) {
        return {"firstName": firstName, "middleName": middleName, "lastName": lastName};
    }

   /*  buildResidentAddressFull(childAddressLine1, childAddressLine2, childCity:string, childProvince:string, childCountry:string) {
        return { "addressLine1": childAddressLine1, "addressLine2": childAddressLine2, "city": childCity, "province": childProvince, "country": childCountry };
    }  */

    
    buildResidentAddress(childCity:string, childProvince:string, childCountry:string) {
        return { "city": childCity, "province": childProvince, "country": childCountry };
    }

   /*  //Build CustomerName
     buildCustomerName(firstName: string, lastName: string){
        if ((firstName === null || firstName === undefined || firstName === "") && (lastName === null || lastName === undefined || lastName === "")) {
            null;
        }
        else {
        return {"firstName": firstName, "lastName": lastName};
        }
    }   */

    //Full Name
    getAge(dob: any) {
        if (dob) {
            const bdate = new Date(dob);
            const timeDiff = Math.abs(Date.now() - bdate.getTime() );
            return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
        }
        else {
            return "";
        }

    }

    getResidence(provinceCode: string, city: string) {
        if (provinceCode) {
            this.canadianProvinces = PROVINCES;
            return this.canadianProvinces.find(x => x.code === provinceCode).text + ", " + city;
        }
        else {
            return "";
        }
    }
    
    getChildResidence(residentAddress:any) {
        //return this.ResidentAddressPipe.transform(residentAddress);
        return residentAddress;
    }
    

    //Address
    getAddress(address: any) {
        //return this.addressPipe.transform(address);
        return address;
    }


    getFullAddress (addressInfo: any) : string [] {
        let fullAddress: string [] = [];
        let addressLine1 = "";
        let addressLine2 = "";

        if (addressInfo.addressLine1) {
            addressLine1 = addressLine1 + addressInfo.addressLine1;
        }

        if (addressInfo.addressLine2) {
            if (addressLine1 === "") {
                addressLine1 = addressInfo.addressLine2;
            }
            else {
                addressLine1 = addressLine1 + " " + addressInfo.addressLine2;
            }
        }

        if (addressInfo.city) {
            addressLine2 = addressInfo.city;
        }
        
        if (addressInfo.province) {
            if (addressLine2 === "") {
                addressLine2 = addressInfo.province;
            }
            else {
                addressLine2 = addressLine2 + " " + addressInfo.province;
            }
        }

        if (addressInfo.country) {
            if (addressLine2 === "") {
                addressLine2 = addressInfo.country;
            }
            else {
                addressLine2 = addressLine2 + " " + addressInfo.country;
            }
        }

        if (addressInfo.postalCode) {
            if (addressLine2 === "") {
                addressLine2 = addressInfo.postalCode;
            }
            else {
                addressLine2 = addressLine2 + " " + addressInfo.postalCode;
            }
        }

        fullAddress[0] = addressLine1;
        fullAddress[1] = addressLine2;
        return fullAddress;
    }

      configureLanguageData() {
        this.loadLangResources("en");
        this.translateService.setDefaultLang("en");
        this.setApplicationLanguage("en");
    }

    getLanguageFilePromise(): Observable<any> {
        return this.httpClient.get(`assets/i18n/resources.json`);
    }

    setApplicationLanguage(lang: string) {
        this.loadLangResources(lang);
        // this.sessionStorage.setLanguage(lang);
        // this.translateService.use(lang);
        // this.languageSubject.next(lang); // Emit the event with the new language
        // this.languageChanged.emit(lang);
    }

    getLanguageObservable(): Observable<string> {
        return this.languageSubject.asObservable();
    }

    setProductLanguage(lang: string) {
        this.loadLangResources(lang);
        this.sessionStorage.setLanguage(lang);
        this.translateService.use(lang);
    }

    loadLangResources(lang: string) {
        this.getLanguageFilePromise().subscribe(langObj => {
            this.setupLaguageData(langObj, lang);

            this.sessionStorage.setLanguage(lang);
            this.translateService.use(lang);
            this.languageSubject.next(lang); // Emit the event with the new language
            this.languageChanged.emit(lang);
        });
    }

    setupLaguageData(langObj: any, lang: string) {
        let enObj: any = {};
        this._parseLangObj(langObj, enObj, lang);
        this.translateService.setTranslation(lang, enObj);
    }

    _parseLangObj(langObj: any, enObj: any, lang: string) {
        Object.keys(langObj).forEach((prop: string) => {
            let val = langObj[prop];
            if (typeof val === 'string') {
                enObj[prop] = val;
            }
            else if (val[lang]) {
                enObj[prop] = val[lang];
            }
            else if (val["en"]) {
                enObj[prop] = val["en"];
            }
            else {
                enObj[prop] = {};
                this._parseLangObj(val, enObj[prop], lang);
            }
        });
    }

    toUTF8Array(str: string) {
        let utf8 = [];
        for (let i = 0; i < str.length; i++) {
            let charcode = str.charCodeAt(i);
            if (charcode < 0x80) utf8.push(charcode);
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6),
                          0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12),
                          0x80 | ((charcode>>6) & 0x3f),
                          0x80 | (charcode & 0x3f));
            }
            // surrogate pair
            else {
                i++;
                // UTF-16 encodes 0x10000-0x10FFFF by
                // subtracting 0x10000 and splitting the
                // 20 bits of 0x0-0xFFFFF into two halves
                charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                          | (str.charCodeAt(i) & 0x3ff));
                utf8.push(0xf0 | (charcode >>18),
                          0x80 | ((charcode>>12) & 0x3f),
                          0x80 | ((charcode>>6) & 0x3f),
                          0x80 | (charcode & 0x3f));
            }
        }
        return utf8;
    }

    addLeadingZero(num: number) {
        let str: string = num.toString();

        if (num < 10) {
            str = "0" + str;
        }

        return str;
    }

    openExcel(file: any, fileName: string) {
        let blob = new Blob([file], { type: 'application/vnd.ms-excel' });            
        var blobUrl = URL.createObjectURL(blob);
        this.sanitizer.bypassSecurityTrustUrl(blobUrl);
    
        var link = document.createElement("a");
        link.setAttribute("href", blobUrl);
        link.setAttribute("download", fileName);
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);   
    }

    getPaymentSessionId() {
        
    }
}
