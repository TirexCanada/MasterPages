import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { environment } from '../../../environments/environment';

import { LoaderService } from "../../shared/services/loader.service";
import { SessionStorageService } from './session-storage.service';
import { UtilService } from './util.service';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {

  activeRequests: number = 0;

  //URLs for which the loading screen should not be enabled
  skippUrls = [
    
  ];

  constructor(private loaderService: LoaderService,
    private sessionStorageService: SessionStorageService,
    private utilService: UtilService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let displayLoadingScreen = true;
    let requestUrl = request.url;
    let req: any;
    let headers: any;
  
    headers = this.headersConfiguration(request.headers);
    req = request.clone({ url: requestUrl, headers: headers });
  
    for (const skippUrl of this.skippUrls) {
      if (new RegExp(skippUrl).test(request.url)) {
        displayLoadingScreen = false;
        break;
      }
    }

    if (displayLoadingScreen) {
      if (this.activeRequests === 0) {
        this.loaderService.startLoading();
      }
      this.activeRequests++;

      return next.handle(req).pipe(
        finalize(() => {
          this.activeRequests--;
          if (this.activeRequests === 0) {
            this.loaderService.stopLoading();
          }
        })
      )
    } else {
      return next.handle(request);
    }
  };

  headersConfiguration(previousHeaders?: HttpHeaders) {
   let headers = {
        'Authorization': 'Bearer ' + this.sessionStorageService.getAuthHeader(),
        'AllowedHeader': 'Origin, origin, content-type, range, authorization',
        'AllowedOrigin': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'AllowedMethod': 'POST, GET',
       
        'X-Requested-With':'XMLHttpRequest'
    };
   
    //let headers = null;
    
    return new HttpHeaders(headers);
  }
}
