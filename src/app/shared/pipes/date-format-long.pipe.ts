import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormatLong',
    standalone: true,
})

export class DateFormatLongPipe implements PipeTransform {
    transform(value: string) {
        var datePipe = new DatePipe("en-CA");
        value = datePipe.transform(value, 'MMM dd, yyyy');
        return value;
    }
}
