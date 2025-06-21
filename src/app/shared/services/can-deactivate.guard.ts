import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import { OnboardingService } from './onboarding.service';
import { GlobalEventsService } from './global-events.service';

export interface CanComponentDeactivate {
    onSubmit: () => Observable<any> | Promise<any> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

    constructor(public GlobalEventsService: GlobalEventsService) {
    }

    canDeactivate(component: CanComponentDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {

        let promise: any = component.onSubmit();

        if (promise instanceof Promise) {
            return promise.then((response) => {
                //this.onboardingService.setCurrentApplication(response);
                return true;
            }, () => {
                return false;
            });
        } else {
            return promise;
        }
    }
}
