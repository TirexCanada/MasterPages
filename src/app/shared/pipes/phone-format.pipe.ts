import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneFormat',
    standalone: true,
})

export class PhoneFormatPipe implements PipeTransform {
    transform(value: string) {
        if (value.length === 10) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
        else if (value.length === 11    ) {
            value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '$1 ($2) $3-$4');
        }    
        return value;
    }
}