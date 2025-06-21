import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let capitalizeValue: string;

        if (!value) {
            return '';
        }

        if (args && value.length) {
            if (args.capitalizeOnce) {
                capitalizeValue = value.charAt(0).toUpperCase() + value.slice(1);
                args.capitalizeOnce = false;
            } else {
                capitalizeValue = value.charAt(0) + value.slice(1);
            }
        } else {
            capitalizeValue = value.charAt(0).toUpperCase() + value.slice(1);
        }

        return capitalizeValue;
    }

}