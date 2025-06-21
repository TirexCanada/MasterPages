import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { PROVINCES } from 'src/app/shared/constants/app-constants';

@Pipe({
    name: 'residentAddress'
})
export class ResidentAddressPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        var titlecasePipe = new TitleCasePipe();

        let residentAddress = "";
        if (!value) {
            return "";
        }

        let provinces = PROVINCES;
        let isCanadaFlag: boolean = false;

        if (value.addressLine1 !== null && value.addressLine1 !== undefined && value.addressLine1 !== "") {
            if (residentAddress) {
                residentAddress = '';
            }
            residentAddress = titlecasePipe.transform(value.addressLine1);
        }

        if (value.addressLine2 !== null && value.addressLine2 !== undefined && value.addressLine2 !== "") {
            if (residentAddress) {
                if (residentAddress) {
                    residentAddress += ' ';
                }
            }
            residentAddress += titlecasePipe.transform(value.addressLine2);
        }

        if (value.city !== null && value.city !== undefined && value.city !== "") {
            if (residentAddress) {
                if (residentAddress) {
                    residentAddress += ' ';
                }
            }
            residentAddress += titlecasePipe.transform(value.city);
        }

        if (value.province !== null && value.province !== undefined && value.province !== "") {
            for (var i = 0; i < provinces.length; i++) {
                if (value.province.toLowerCase() === provinces[i].code.toLowerCase()) {
                    isCanadaFlag = true;
                    value.province = provinces[i].text.toLowerCase()
                    break;
                } 
                else if (value.province.toLowerCase() === provinces[i].text.toLowerCase()) {
                    isCanadaFlag = true;
                    break;
                }
            }

            if (isCanadaFlag) {
                if (residentAddress) {
                    residentAddress += ', ';
                }
                residentAddress += titlecasePipe.transform(value.province);
            }
        }

        if (value.country !== null && value.country !== undefined && value.country !== "") {
            if (isCanadaFlag === false) {
                if (residentAddress) {
                    residentAddress += ', ';
                }
                residentAddress += titlecasePipe.transform(value.country);
            }
        }

        return residentAddress;
    }
}
