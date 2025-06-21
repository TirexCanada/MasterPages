import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { CustomerService } from 'src/app/shared/services/customer.service';


import { ICustomer } from 'src/app/shared/interfaces/customer.interface';

@Component({
  selector: 'app-payment-error',
  templateUrl: './payment-error.component.html',
  styleUrls: ['./payment-error.component.css']
})
export class PaymentErrorComponent implements OnInit {
  currentCustomer: ICustomer;
  lob: string;

  constructor(private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private sessionStorageService: SessionStorageService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.currentCustomer = this.authenticationService.getLoggedCustomer();
    //this.lob = environment.lob;
    

  /*   this.shoppingCartService.updateShoppingCart(this.shoppingCart).subscribe(
      response => this.updateOnSuccess(response, this.shoppingCart),
      response => this.updateOnError(response)
    ); */
  }

  private updateOnSuccess(response: any, shoppingCart: any ): void {
   /*  for(var i = 0; i < shoppingCart.shoppingCartItems.length; i++) {
      let inventory: ICustomerInventory = {};
      inventory.customerId = shoppingCart.customerId;
      inventory.productId = shoppingCart.shoppingCartItems[i].productId;
      inventory.lob = environment.lob;
  
      this.customerInventory.push(inventory);
    }  */
    
    /* this.currentCustomer = { id: shoppingCart.customerId, updateSection: "Inventory", customerInventoryInformation: this.customerInventory }; */
    
    //this.sessionStorageService.setShoppingCart(null);

   /*  this.customerService.updateCustomer(this.currentCustomer).subscribe(
      response => this.updateCustomerOnSuccess(response),
      response => this.updateCustomerOnError(response)
    ); */

/* 
    let loginUrl = environment.portalLoginUrl;
    let emailRequestModel = {"customerId": response.customerId, "lob": environment.lob, "emailType": "payment-failure", "optionalParam": loginUrl};
    this.customerService.sendCustomerEmail(emailRequestModel).subscribe(emailResult => {
      let result = emailResult;
    });   */
  }

  private updateOnError(response: any): void {

  }

  /* private updateCustomerOnSuccess(response: any ): void {
    let loginUrl = environment.portalLoginUrl;
    let emailRequestModel = {"customerId": response.id, "lob": environment.lob, "emailType": "payment-success", "optionalParam": loginUrl};
    this.customerService.sendCustomerEmail(emailRequestModel).subscribe(emailResult => {
      let result = emailResult;
    });  
  }

  private updateCustomerOnError(response: any): void {
    let emailRequestModel = {"id": response.id, "lob": environment.lob, "emailType": "payment-failure"};
    this.customerService.sendCustomerEmail(emailRequestModel).subscribe(emailResult => {
      let result = emailResult;
    });
  } */

  goToPayment() {
    //this.navigationService.navigateToPortalDashboard();
  }
}
