/**
 * The main method validates the incoming string in this the string is control.value, the test
 * method checks the pattern against the regex. After it will either return null if the
 * string is size 0 or if valid is true which means the email is valid or return false with the isNotEmail
 * object if teh email is not valid.
 */
import { Directive, HostListener } from '@angular/core';
import { ApplicationService } from 'src/app/shared/services/application.service';
import { NG_VALIDATORS, Validator, AbstractControl } from '../../../../node_modules/@angular/forms';

@Directive({
    selector: '[appEmail]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EmailDirective, multi: true }]
})

export class EmailDirective implements Validator {
    constructor() {
    }

    validate(control: AbstractControl): { [key: string]: any } {
        let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        let valid = emailRegEx.test(control.value);
        return (control.value == undefined || control.value < 1) || valid ? null : { 'isNotEmail': true };
    }

   /*  @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (event.keyCode == 32)
            event.preventDefault();
    } */
}




