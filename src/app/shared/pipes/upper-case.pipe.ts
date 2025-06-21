import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'upperCase'
})
export class UpperCasePipe implements PipeTransform {

    transform(value: string, args?: any): any {
        if (value === null || value === undefined) {
            return "";
        }

        return value.toUpperCase();    
    }
}
