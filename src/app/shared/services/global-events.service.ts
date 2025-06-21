import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalEventsInterface } from '../interfaces/global-events.interface';

@Injectable()
export class GlobalEventsService {

    public eventSubject = new Subject<GlobalEventsInterface>();
    eventState = this.eventSubject.asObservable();
    constructor() { }

    triggerWhatsMissingEvent() {
        this.eventSubject.next(<GlobalEventsInterface>{ GET_MISSING_FIELDS: true });
    }

    triggerLeftNavigationEvent() {
        this.eventSubject.next(<GlobalEventsInterface>{ REBUILD_LEFT_NAVIGATION: true });
    }
}
