import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {

    transform(value: boolean, args?: any): any {
        if (value === null || value === undefined) {
            return "";
        }

        if (value === true) {
            return "Yes";
        }

        if (value === false) {
            return "No";
        }
    }
}
