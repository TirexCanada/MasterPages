import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateTimeFormat',
})

export class DateTimeFormatPipe implements PipeTransform {
    transform(value: string) {
        var datePipe = new DatePipe("en-CA");
        let value1 = datePipe.transform(value, 'MMM dd, yyyy');
        let value2 = datePipe.transform(value, 'hh:mm a');
        value = value1 + ' at ' + value2;
        return value;
    }
}
