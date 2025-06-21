import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'loginName'
})
export class LoginName implements PipeTransform {

    transform(value: any, args?: any): any {
        let loginName = "";
        if (!value) {
            return "";
        }

        if (value.firstName === null || value.firstName === undefined || value.firstName === "" || value.lastName === null || value.lastName === undefined || value.lastName === "" ) 
        {
            if (loginName) {
                loginName += ' ';
            } 
            loginName += value.email;     
        }

        if (value.firstName !== null && value.firstName !== undefined && value.firstName !== "") {
            if (loginName) {
                loginName += ' ';
            } 
            loginName += value.firstName[0].toUpperCase() + value.firstName.substr(1).toLowerCase();
        }

        /* if (args !== null && args !== undefined && args.length > 0 && args[0] !== false) {
            if (value.middleName !== null && value.middleName !== undefined && value.middleName !== "") {
                if (loginName) {
                   loginName += ' ';
               }
               loginName += value.middleName[0].toUpperCase() + value.middleName.substr(1).toLowerCase();
           }
       }

        if (value.lastName !== null && value.lastName !== undefined && value.lastName !== "") {
            if (loginName) {
                loginName += ' ';
            } 
            loginName += value.lastName[0].toUpperCase() + value.lastName.substr(1).toLowerCase();
        }  */

        return loginName;
    }
}

