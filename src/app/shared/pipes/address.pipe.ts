import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'address'
})
export class AddressPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let address = "";
        if (!value) {
            return "";
        }

        if (value.addressLine1) {
            address += value.addressLine1;
        }

        if (value.city) {
            if (address) {
                address += ', ';
            }
            address += value.city;
        }
        
        address += ", Ontario";
        
        return address;
    }
}
