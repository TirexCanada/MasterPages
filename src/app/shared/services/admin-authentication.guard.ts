import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AdminAuthenticationService } from './admin-authentication.service';

@Injectable()
export class AdminAuthenticationGuard implements CanActivate {
  constructor(private adminAuthenticationService: AdminAuthenticationService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    /* return this.adminAuthenticationService.getIsAdminLoggedIn().pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );  */

    let admin = this.adminAuthenticationService.getLoggedAdmin();

    if (admin) {
      return of(true);    
    }
    else {
      this.router.navigate(['login']);
      return of(false);
    }
  }
}
