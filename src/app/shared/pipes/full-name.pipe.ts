import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let fullName = "";
        if (!value) {
            return "";
        }

        if (value.firstName !== null && value.firstName !== undefined && value.firstName !== "") {
            fullName += value.firstName[0].toUpperCase() + value.firstName.substr(1).toLowerCase();
        }

        if (value.middleName !== null && value.middleName !== undefined && value.middleName !== "") {
                if (fullName) {
                    fullName += ' ';
                }
                fullName += value.middleName[0].toUpperCase() + value.middleName.substr(1).toLowerCase();
            }
        

        if (value.lastName !== null && value.lastName !== undefined && value.lastName !== "") {
            if (fullName) {
                fullName += ' ';
            }
            fullName += value.lastName[0].toUpperCase() + value.lastName.substr(1).toLowerCase();
        }
        
        return fullName;
    }
}
