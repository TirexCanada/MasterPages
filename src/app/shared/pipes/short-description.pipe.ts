import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortDescription'
})
export class ShortDescriptionPipe implements PipeTransform {

    transform(value: string, args?: any): string {
        let shortDescription = "";
        if (!value) {
            return "";
        }

        if (value.length > 50) {
            shortDescription = value.substring(0, 50);
            let spaceIndex = shortDescription.lastIndexOf(" ", 0);
            shortDescription = shortDescription.substring(0, spaceIndex);
        }
        else {
            shortDescription = value;
        }
 
        return shortDescription;
    }
}
