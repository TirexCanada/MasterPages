import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class TranslationLoaderResolver implements Resolve<any> {
    constructor(private translate: TranslateService){
    }

    resolve (): Observable<any> | Promise<any> | any {
        return this.translate.get("last.dummy"); 
    }
}
