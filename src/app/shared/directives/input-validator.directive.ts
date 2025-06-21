/*
  Use this class to format the validate Input fields and Block Paste Events
  Usage Example : InputValidator="ct1 ct5"

CT1	English Alphabetic	 a-z, A-Z
CT2	French Alphabetic	àâäçéèêëîïôöûùüÿÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ'’ `
CT3	Numeric only	1, 2, 3, 4 etc
CT4	English Alphanumeric	 a-z, A-Z,  1, 2, 3 , 4 etc
CT5	Basic Special Characters  	Space () , hyphen (-), apostrophe('), slash(/), column(:)
CT6	Period 	Period (.)
CT7	Additional Special Characters  	Ampersand (&), comma (,), underscore (_)
CT8	email	@
CT10	Basic Special Characters  	Space () , hyphen (-), apostrophe('), slash(/), column(:)
CT12 Special characters ( && )	&& - && . && ; && : && # && ? && ' && space
CT13 phone	1, 2, 3, 4 etc. and ( ) -
*/


import { Directive, ElementRef, HostListener, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { ApplicationService } from '../../../app/shared/services/application.service';



@Directive({
    selector: '[appInputValidator]',
    standalone: true,
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputValidatorDirective), multi: true }
    ]
})
export class InputValidatorDirective implements Validator {
    public validationData: any;
    public regex: RegExp;
    public pattern: string | RegExp;
    public patternPrefix: string;
    public patternPostfix: string;
    public isCurrency: boolean = false;
    public forceToCheckAllowedKeys: boolean = false;
    public specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete'];
    public numLockKeys: Array<string> = ['Del', 'Divide', 'Add', 'Subtract', 'Multiply'];
    @Input() duplicateValues: any[];
    @Input() allowedKeys: any[];
    @Input() allowMultipleSpaces: boolean;
    @Input() allowSpaces: boolean;

    constructor(public el: ElementRef, public applicationService: ApplicationService) {
        this.pattern = '';
        this.allowedKeys = [];
        this.patternPrefix = '^[';
        this.patternPostfix = ']*$';
    }

    @Input() set InputValidator(validationType: any) {
        this.validationData = this.applicationService.getValidationData();

        this.setForceToCheckAllowedKeys(false);

        /* if (validationType.indexOf('fn') !== -1) {  // If fn in input - Regular Expression for First name
            //this.pattern += 'a-zA-Z';
            this.pattern += this.validationData['registration'].legalName.firstName.regex;
        }

        if (validationType.indexOf('ln') !== -1) {  // If ln in input - Regular Expression for Last name
            this.pattern += this.validationData['registration'].legalName.lastName.regex;
        }

        if (validationType.indexOf('mn') !== -1) {  // If mn in input - Regular Expression for Middle name
            this.pattern += this.validationData['registration'].legalName.middletName.regex;
        } */

        if (validationType.indexOf('ct1') !== -1) {  // If CT1 in input Add Alphabets to the Regular Expression
            this.pattern += 'a-zA-Z\u0400-\u04FF';
        }
        if (validationType.indexOf('ct2') !== -1) {  // If CT2 in input Add French Text to the Regular Expression
            // tslint:disable-next-line:quotemark
            this.pattern += "àâäçéèêëîïôöûùüÿÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ’'«»‘œ"; // Updating French text as per CDI Document
        }
        if (validationType.indexOf('ct3') !== -1) { // If CT3 in input Add Numeric  to the Regular Expression
            this.pattern += '0-9';
        }
        if (validationType.indexOf('ct4') !== -1) {// If CT4 in input Add AlphaNumeric  to the Regular Expression
            this.pattern += 'a-zA-Z0-9\u0400-\u04FF';
        }
        if (validationType.indexOf('ct5') !== -1) {// If CT5 in input Add space() ' and -  to the Regular Expression
            // tslint:disable-next-line:quotemark
            this.pattern += "\\-\\'\ ";
        }
        if (validationType.indexOf('ct6') !== -1) {// If CT6 in input Add period (.) and (,) to the Regular Expression
            this.pattern += '\.\,';
        }
        if (validationType.indexOf('ct7') !== -1) { // If CT7 in input Add 	Ampersand (&), Dash (#), comma (,), underscore (_)  to the Regular Expression
            this.pattern += '\&\#\_\,';
        }
        if (validationType.indexOf('ct8') !== -1) {// If CT8 in input Add @ to the Regular Expression
            this.pattern += '\@\ ';
        }
        if (validationType.indexOf('ct9') !== -1) {// If CT8 in input Add , / and \ to the Regular Expression
            this.pattern += '\/\,\\\ ';
        }
        if (validationType.indexOf('ct10') !== -1) { // If CT10 in input Add -, comma (,) and Space( ) and Ampersand (&) to the Regular Expression
            this.pattern += '\&\\-\\,\;\ \.';
        }
        if (validationType.indexOf('ct11') !== -1) { // If CT11 then allow everything except these characters
            this.regex = /^([^`~@%^{}[\]\\\|"\?]*)$/;
            this.resetPatternPrefixAndPostfix();
        }
        if (validationType.indexOf('ct12') !== -1) { // If CT12 in input Add ( && )	&& - && . && ; && : && ' && # && space to the Regular Expression
            this.pattern += '\\-\\(\)\,\?\'\:\;\ \.\#';
        }
        if (validationType.indexOf('ct13') !== -1) { // If CT13 in input Add && $ && to the Regular Expression
            this.pattern += '\$';
        }
        if (validationType.indexOf('ct14') !== -1) { // If CT14 in input Add - && space to the Regular Expression
            this.pattern += '\\-\ ';
        }
        if (validationType.indexOf('ct15') !== -1) {// If CT15 in input Add period (.) and (@) and (-) and (_) and (/) to the Regular Expression
            this.pattern += '\\-\.\@\_\/';
        }
        if (validationType.indexOf('space') !== -1) {// Add space
            this.pattern += "\ ";
        }
        if (validationType.indexOf('percentage') !== -1) { // If CT11 then allow everything except these characters
          this.regex = /^(100(\.00?)?|(.)?|[1-9]?\d(\.\d\d?)?)$/;
          this.resetPatternPrefixAndPostfix();
        }
        if (validationType.indexOf('frenchWithNoSingleQoute') !== -1) {  // If frenchWithNoSingleQoute in input Add French Text with no single quotes to the Regular Expression
            this.pattern += "àâäçéèêëîïôöûùüÿÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ ";
        }
        if (validationType.indexOf('frenchWithNoTiltSign') !== -1) {  // If frenchWithNoSingleQoute in input Add French Text to the Regular Expression
            this.pattern += "àâäçéèêëîïôöûùüÿÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ'’ ";
        }

        if (validationType === 'alphaNumericSplCharsWithBackslashDoubleQuotes') {  
            this.regex = /^[A-Za-z0-9~@!#$%*"/'()=,<.>?;:+-\]_[{}|&^àâäçéèêëîïôöûùüÿÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ`’"«»"‘œ\n ]*$/;
            this.resetPatternPrefixAndPostfix();
        }
        if (validationType === 'alphaNumericSplCharsExceptBackslashDoubleQuotes') {  
            this.regex = /^[A-Za-z0-9~@!#$%*'()=,<.>?;:{}|&^àâäçéèêëîïôöûùüÿÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ`’«»‘œ\n ]*$/;
            this.resetPatternPrefixAndPostfix();
        }
        if (validationType === 'alphaNumericSplCharsExceptBackslashDoubleQuotesAtTheRate') {  
            this.regex = /^[A-Za-z0-9!#$*()=,<.>;:+_/&àâäçéèêëîïôöûùüÿÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ’«»'‘œ\n -]*$/;
            this.resetPatternPrefixAndPostfix();
        }
        if (validationType === 'lettersOnlyFrenchSpecialCharacter') {  
            this.regex = /^[a-zA-Z-'àâäçéèêëîïôöûùüÿÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ’«»‘œ ]*$/ ;
            this.resetPatternPrefixAndPostfix();
        }
        if (validationType === 'frenchAlphaSplChars') {  
            this.regex = /^[A-Za-z!#$*()=,<.>;:+_%^{}/@&àâäçéèêëîïôöûùüÿÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ’«»‘œ\n -]*$/;
            this.resetPatternPrefixAndPostfix();
        }

        if (validationType === 'freeFormTextExceptSomeSpecialCharacters') {  
            this.regex = /^([^`~@%^{}[\]\\\|"\?]*)$/;
            this.resetPatternPrefixAndPostfix();
        }
        if (validationType === 'englishFrenchQuote') {  
            this.regex =  /^[a-zA-Z-'àâäçéèêëîïôöûùüÿÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ ]*$/ ;
            this.resetPatternPrefixAndPostfix();
        }
        if (validationType.indexOf('currency') !== -1) {
            this.regex = /^(999999999(\.\d\d?)?|[1-9]?\d{0,8}(\.\d\d?)?)$/;
            this.isCurrency = true;
            // this.regex = /^\d*\.?\d{0,2}$/g;
            // /^\d*\.?\d{0,2}$/g
            this.resetPatternPrefixAndPostfix();
        }
        if (this.allowedKeys && (this.allowedKeys || []).length > 0) {
            this.pattern += this.allowedKeys.join('');
        }
        this.regex = this.regex ? this.regex : new RegExp(this.patternPrefix + this.pattern + this.patternPostfix);
    }

    isCurrencyFormat() {
        return this.isCurrency;
    }

    setForceToCheckAllowedKeys(mode: boolean = true) {
        this.forceToCheckAllowedKeys = mode;
    }

    getForceToCheckAllowedKeys() {
        return this.forceToCheckAllowedKeys;
    }

    resetPatternPrefixAndPostfix() {
        this.patternPrefix = '';
        this.patternPostfix = '';
        this.setForceToCheckAllowedKeys();
    }

    validate(control: AbstractControl) {
        //let valid = passwordRegEx.test(control.value);
        if (control.value && !this.regex.test(control.value)) {

            //return (control.value == undefined || control.value < 1) || valid ? null : { 'isNotPassword': true };

            return {
                invalid: true
            };
        }
        if (this.duplicateValues && (this.duplicateValues || []).length > 0) {
            if (this.duplicateValues.includes(control.value)) {
                return {
                    duplicate: true
                };
            }
        }

        return null;
    }

    @HostListener('keypress', ['$event'])
    onkeypress(event: KeyboardEvent) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        if (this.getForceToCheckAllowedKeys() && this.allowedKeys.indexOf(event.key) !== -1) {
            return;
        }

        if (this.isCurrencyFormat()) {
            let value = (this.el.nativeElement.value || '').toString();
            let cursorPosition = this.el.nativeElement;
            let floatNumber = value.split('.');
            if (floatNumber.length > 1 && event.keyCode === 46) {
                event.preventDefault();
                return;
            }
            if (value) {
                let decimalPoint = value.charCodeAt(value.length - 3);
                if (decimalPoint === 46 && cursorPosition.selectionStart > (value.length - 3)) {
                    event.preventDefault();
                    return;
                }
            }
        }

        if (this.numLockKeys.indexOf(event.key) !== -1) {
            event.preventDefault();
            return;
        }

        if (!this.regex.test(event.key) || (this.el.nativeElement.value.length === 0 && event.key === ' ')) {
            event.preventDefault();
            return;
        }


    }

    @HostListener('keydown', ['$event'])
    onkeydown(event: KeyboardEvent) {
        if (!this.allowMultipleSpaces) {
            let pos = this.el.nativeElement.selectionStart;
            let val = this.el.nativeElement.value.toString();
            if (event.keyCode === 32 && val.charCodeAt(pos - 1) === 32) {
                event.preventDefault();
                return;
            }
        }
        if (!this.allowSpaces && this.allowSpaces !== undefined && event.keyCode === 32) {
            event.preventDefault();
            return;
        }
    }
}

