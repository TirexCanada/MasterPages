import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { NavigationService } from './navigation.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService, 
    private navigationService: NavigationService,
    private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let customer = this.authenticationService.getLoggedCustomer();

    if (customer) {
      return of(true);    
    }
    else {
      this.navigationService.navigateToLoginWithSession();
      return of(false);
    }
  }
}
