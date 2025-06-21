import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormat',
    standalone: true,
})

export class DateFormatPipe implements PipeTransform {
    transform(value: string) {
        var datePipe = new DatePipe("en-CA");
        value = datePipe.transform(value, 'dd/MM/yyyy');
        return value;
    }
}
