import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavigationService } from 'src/app/shared/services/navigation.service';
import { ApplicationService } from 'src/app/shared/services/application.service';

import { PAYMENT_PERIODS } from '../../constants/portal-constants';
import { PAYMENT_PERIODS_NUMBERS } from '../../constants/portal-constants';
import { PRICES } from '../../constants/portal-constants';


@Component({
  selector: 'app-boost-page',
  templateUrl: './boost-page.component.html',
  styleUrls: ['./boost-page.component.css']
})
export class BoostPageComponent implements OnInit {

  prices: any[];
  paymentPeriodsOptions: any[];
  paymentPeriodsNumbersOptions: any[];
  paymentModel: any;
  paymentSessionId: string;

  @ViewChild('paymentForm', { static: true }) form: NgForm;

  constructor(private navigationService: NavigationService,
    private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.paymentModel = { "paymentPeriodNumber": "1", "paymentPeriod": "days", "price": 1, "discount": 0, "subtotal": 1, "hst": 0.13, "total": 1.13 }
    this.prices = PRICES;
    this.paymentPeriodsOptions = PAYMENT_PERIODS;
    this.paymentPeriodsNumbersOptions = PAYMENT_PERIODS_NUMBERS;

  /*   this.applicationService.getPaymentSessionId().subscribe(response => {
      this.paymentSessionId = response;
    }); */
  }


  selectPaymentPeriodNumber() {
    let price = this.prices.find(x => x.days === 1);

    switch(this.paymentModel.paymentPeriod) {
      case "days":    
        this.paymentModel.price = parseInt(this.paymentModel.paymentPeriodNumber) * price.price;
        break;
      case "weeks":
        if (parseInt(this.paymentModel.paymentPeriodNumber) === 1) {
          this.paymentModel.price = parseInt(this.paymentModel.paymentPeriodNumber) * 7 * price.price;
        }
        else if (parseInt(this.paymentModel.paymentPeriodNumber) === 2) {
          price = this.prices.find(x => x.days === 14);
          this.paymentModel.price = parseInt(this.paymentModel.paymentPeriodNumber) * 7 * price.price * (100 - price.discount) / 100;
        }
        else if (parseInt(this.paymentModel.paymentPeriodNumber) === 3) {
          price = this.prices.find(x => x.days === 21);
          this.paymentModel.price = parseInt(this.paymentModel.paymentPeriodNumber) * 7 * price.price * (100 - price.discount) / 100;
        }
        else if (parseInt(this.paymentModel.paymentPeriodNumber) > 3) {
          price = this.prices.find(x => x.days === 28);
          this.paymentModel.price = parseInt(this.paymentModel.paymentPeriodNumber) * 7 * price.price * (100 - price.discount) / 100;
        }
        break;
      case "months":   
      price = this.prices.find(x => x.days === 28); 
        this.paymentModel.price = parseInt(this.paymentModel.paymentPeriodNumber) * 30 * price.price * (100 - price.discount) / 100;
        break;
    }

    this.paymentModel.subtotal = this.paymentModel.price;
    this.paymentModel.hst = this.paymentModel.subtotal * 0.13;
    this.paymentModel.total = this.paymentModel.subtotal * 1.13;
  }

  selectPaymentPeriod() {
    let price = this.prices.find(x => x.days === 1);

    switch(this.paymentModel.paymentPeriod) {
      case "days":    
        this.paymentModel.price = parseInt(this.paymentModel.paymentPeriodNumber) * price.price;
        break;
      case "weeks":
        if (parseInt(this.paymentModel.paymentPeriodNumber) === 1) {
          this.paymentModel.price = parseInt(this.paymentModel.paymentPeriodNumber) * 7 * price.price;
        }
        else if (parseInt(this.paymentModel.paymentPeriodNumber) === 2) {
          price = this.prices.find(x => x.days === 14);
          this.paymentModel.price = parseInt(this.paymentModel.paymentPeriodNumber) * 7 * price.price * (100 - price.discount) / 100;
        }
        else if (parseInt(this.paymentModel.paymentPeriodNumber) === 3) {
          price = this.prices.find(x => x.days === 21);
          this.paymentModel.price = parseInt(this.paymentModel.paymentPeriodNumber) * 7 * price.price * (100 - price.discount) / 100;
        }
        else if (parseInt(this.paymentModel.paymentPeriodNumber) > 3) {
          price = this.prices.find(x => x.days === 28);
          this.paymentModel.price = parseInt(this.paymentModel.paymentPeriodNumber) * 7 * price.price * (100 - price.discount) / 100;
        }
        break;
      case "months":   
      price = this.prices.find(x => x.days === 28); 
        this.paymentModel.price = parseInt(this.paymentModel.paymentPeriodNumber) * 30 * price.price * (100 - price.discount) / 100;
        break;
    }

    this.paymentModel.subtotal = this.paymentModel.price;
    this.paymentModel.hst = this.paymentModel.subtotal * 0.13;
    this.paymentModel.total = this.paymentModel.subtotal * 1.13;
  }


  goToPayment() {
    this.navigationService.navigateToPayment();
  }
}
