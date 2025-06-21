import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'linebreaks',
    standalone: true,
})

export class LineBreaksPipe implements PipeTransform {

    // transform(value: string): string {
    //   //return value.replace(/\\n/g, '<br />');
    //   return value.replace(/(\r\n|\r|\n)/g, '<br/>');
    // }

    transform(value: string): string {
      if (!value) {
        return value;
      }
      return value.replace(/(?:\\[rn]|[\r\n])/g,"<br>")
    }
  }