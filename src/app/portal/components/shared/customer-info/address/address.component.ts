import { FormGroup, ControlContainer, NgForm } from '@angular/forms';
import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';

import { ApplicationService } from 'src/app/shared/services/application.service';

import { PROVINCES } from 'src/app/shared/constants/app-constants';
import { MONTHS } from 'src/app/shared/constants/app-constants';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddressComponent implements OnInit, OnChanges {
  validationData: any;

  canadianResidenceOptionsData: any [];
  canadianProvinceOptionsData: any [];
  monthOptionsData: any [];
  yearOptionsData: any [];
  addressTitle: string;

  @Input() hideAddress: boolean;
  @Input() defaultCountry: string;
  @Input() countryDisabledFlag: boolean;
  @Input() countryShowFlag: boolean;
  @Input() provinceShowFlag: boolean;
  @Input() addressLine2ShowFlag: boolean;
  @Input() phoneNumberShowFlag: boolean;
  @Input() emailShowFlag: boolean;
  @Input() postalcodeShowFlag: boolean;
  @Input() datesShowFlag: boolean;
  @Input() emailMessageFlag: boolean;
  @Input() addressLineTitle: string;
  @Input() defaultCity: string;
  @Input() defaultProvince: string;
  @Input() defaultAddressLine1: string;
  @Input() defaultAddressLine2: string;
  @Input() defaultPostalCode: string;
  @Input() defaultMonth: string;
  @Input() defaultYear: string;
  @Input() maxPostalCode: number;
  @Input() selectedProvince: string;
  @Input() isProvinceRequired: boolean;
  @Input() isProvinceDisabled: boolean;
  @Input() isProvinceValid: boolean;
  @Input() isEmailRequired: boolean;
  @Input() marriageFlag: boolean;
  @Input() dateResidenceFlag: boolean;
  @Input() canadianResidenceFlag: boolean;

  @Input() title: string;
  @Input() residenceInProvinceTitle: any;
  @Input() residenceMonthTitle: any;
  @Input() residenceYearTitle: any;
  @Input() model: any;
  @Input() modelName: string;
  @Input() form: NgForm;
  @Input() section: any;
  @Input() submitted: any;
  @Input() oneColumnMode: boolean;

  constructor(private applicationService: ApplicationService) { }

  ngOnInit() {
    this.validationData = this.applicationService.getValidationData();

    this.canadianProvinceOptionsData = PROVINCES;
    this.monthOptionsData = MONTHS;
    this.yearOptionsData = this.getYearsOptions();
  }

  ngOnChanges(changes) {
    let a = changes;
  }

  getYearsOptions() {
    let years: any [] = [];
    let currentYear = (new Date()).getFullYear();

    for (var i = currentYear; i > currentYear - 80; i--) {
      years.push ({ "code": i, "text": i});
    }

    return years;
  }

  getProvinceTitle() {
    if (this.section === "customer") {
      if (this.model['customerCanadianResidenceFlag'] !== undefined) {
        if (this.model['customerCanadianResidenceFlag'] === true) {
          return "Province";
        }
        else {
          return "Province/State";
        }
      }
      else {
        return "Province";
      }
    }

    if (this.section === "spouse") {
      if (this.model['spouseCanadianResidenceFlag'] !== undefined) {
        if (this.model['spouseCanadianResidenceFlag'] === true) {
          return "Province";
        }
        else {
          return "Province/State";
        }
      }
      else {
        return "Province";
      }
    }

    if (this.section === "new") {
        return "Province/State";
    }
    else {
      return "Province";
    }
  }

  getPostalCodeTitle() {
    if (this.section === "customer") {
      if (this.model['customerCanadianResidenceFlag'] !== undefined) {
        if (this.model['customerCanadianResidenceFlag'] === true) {
          return "Postal code";
        }
        else {
          return "Postal/Zip code";
        }
      }
      else {
        return "Postal code";
      }
    }
    if (this.section === "spouse") {
      if (this.model['spouseCanadianResidenceFlag'] !== undefined) {
        if (this.model['spouseCanadianResidenceFlag'] === true) {
          return "Postal code";
        }
        else {
          return "Postal/Zip code";
        }
      }
      else {
        return "Postal code";
      }
    }
    else {
      return "Postal code";
    }
  }

  isResidenceDateValid() {
    let currentDate = new Date();
    let lastYearDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDay(), 7, 0, 0, 0);
    
    if (this.section === "customer") {
      if (this.model['customerCanadianResidenceFlag'] !== undefined) {
        if (this.model['customerCanadianResidenceFlag'] === false) {
          return true;
        }
        else {
          if (this.model['customerDateResidenceFlag'] !== undefined) {
            let month = this.model['customerResidenceMonth'] - 1;
            let year = this.model['customerResidenceYear'];

            if (month===undefined || year===undefined) {
              return true;
            }
            
            let day = new Date().getDay();
            let residenceDate = new Date(year, month, day, 7, 0, 0, 0);

            if (this.model['customerDateResidenceFlag'] === false) {
              if (residenceDate < lastYearDate) {
                return false;
              }
              else {
                return true;
              }
            }
            else {
              if (residenceDate < lastYearDate) {
                return true;
              }
              else {
                return false;
              }
            }
          }
          else {
            return true;
          }
        }
      }
      else {
        return true;
      }
    }
    else if (this.section === "spouse") {
      if (this.model['spouseCanadianResidenceFlag'] !== undefined) {
        if (this.model['spouseCanadianResidenceFlag'] === false) {
          return true;
        }
        else {
          if (this.model['spouseDateResidenceFlag'] !== undefined) {
            let month = this.model['spouseResidenceMonth'] - 1;
            let year = this.model['spouseResidenceYear'];

            if (month===undefined || year===undefined) {
              return true;
            }

            let day = new Date().getDay();
            let residenceDate = new Date(year, month, day, 7, 0, 0, 0);

            if (this.model['spouseDateResidenceFlag'] === false) {
              if (residenceDate < lastYearDate) {
                return false;
              }
              else {
                return true;
              }
            }
            else {
              if (residenceDate < lastYearDate) {
                return true;
              }
              else {
                return false;
              }
            }
          }
          else {
            return true;
          }
        }
      }
      else {
        return true;
      }
    }

    return false;
  }
}
