import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appLettersOnly]'
})

export class LettersOnlyDirective {
    public regex: RegExp;
    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    public specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];
    public isLastCharSpace: string;

    constructor(public el: ElementRef) {
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        this.regex = new RegExp(/^[A-Za-z']*$/);
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        const current: string = this.el.nativeElement.value;
        let next: string;
        next = current.concat(event.key);
        if (!this.regex.test(next)) {
            event.preventDefault();
        }
    }

    @HostListener('mousedown', ['$event'])
    onmspointerdown(event: MouseEvent) {
        if (event.button === 2) {
            event.preventDefault();
        }
    }
}
