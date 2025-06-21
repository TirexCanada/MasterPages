import { Component, OnInit } from '@angular/core';

import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-payment-redirect',
  templateUrl: './payment-redirect.component.html',
  styleUrls: ['./payment-redirect.component.css']
})
export class PaymentRedirectComponent implements OnInit {

  constructor(private navigationService: NavigationService) { 
    this.navigationService.navigateToPayment();
  }

  ngOnInit(): void {
  }
}
