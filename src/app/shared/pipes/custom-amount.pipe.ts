import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customAmount'
})

export class CustomAmountPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let customAmount = null;

    if (!value) {
        return null;
    }

    if (value === "TBD") {
      customAmount = "To Be Determined";
    }

    if (value === "N/A") {
      customAmount = "Not Applicable";
    }
   
    return customAmount;
  }

}