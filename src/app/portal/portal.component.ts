import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterEvent, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';


import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

//import { SeoService } from './../shared/services/seo.service';

import { PortalHeaderComponent } from './components/navigation/portal-header/portal-header.component';
import { PortalFooterComponent } from './components/navigation/portal-footer/portal-footer.component';

@Component({
    selector: 'portal-root',
    standalone: true,   
    imports: [RouterModule, PortalHeaderComponent, PortalFooterComponent],
    templateUrl: './portal.component.html',
    styleUrls: ['./portal.component.css']
})

export class PortalComponent implements OnInit, OnDestroy {   
    destroyed = new Subject<any>();

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizer,
        //private seoService: SeoService
    ) {
            this.router.events.pipe(
                filter((event: any) => event instanceof NavigationEnd),
              )
            .subscribe(() => {
                var route = this.getChild(this.activatedRoute)
                var data = route.snapshot.data;
               /*  this.seoService.updateTitle(data.seo.title);              
                this.seoService.updateMetaTags(data.seo.metaTags)    */         
            })
    }
          
    getChild(activatedRoute: ActivatedRoute): any {
        if (activatedRoute.firstChild)
            return this.getChild(activatedRoute.firstChild);
        else
            return activatedRoute;
    }
    
    onActivateRoute() {
        window.scrollTo(0, 0);
    }

    ngOnInit() { 
    }

    ngOnDestroy(): void {
        //this.destroyed.next();
        this.destroyed.complete();
    }
}
