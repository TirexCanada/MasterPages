import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'componentTitle'
})
export class ComponentTitlePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let titleValue: string;

        if (!value) {
            return '';
        }
       
        titleValue = value.charAt(0).toUpperCase() + value.slice(1, value.indexOf("-")) + " " + value.charAt(value.indexOf("-") + 1).toUpperCase() + value.slice(value.indexOf("-") + 2);
        
        return titleValue;
    }

}