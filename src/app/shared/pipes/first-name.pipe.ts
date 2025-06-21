import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'firstName'
})
export class FirstNamePipe implements PipeTransform {

    transform(value: string, arg1: any, arg2: any): any {
        if (value === null || value === undefined) {
            return "";
        }

        if (arg1 === undefined) {
            arg1 = "";
        }
        else {
            arg1 = _.capitalize(arg1);  
        }

        if (arg2 === undefined) {
            arg2 = "";
        }
        else {
            arg2 = _.capitalize(arg2);  
        }

        let newValue = value;
       
        if (value.indexOf("{{customerFirstName}}") > -1) {
            newValue = value.split("{{customerFirstName}}").join(arg1);
        }     

        if (value.indexOf("{{spouseFirstName}}") > -1) {
            if (arg2 === "") {
                newValue = value.split("{{spouseFirstName}}").join(arg1);
            }
            else {
                newValue = newValue.split("{{spouseFirstName}}").join(arg2);
            }
        }   

        return newValue; 
    }
}
