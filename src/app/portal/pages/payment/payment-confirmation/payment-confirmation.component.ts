import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators'


import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { PortalService } from '../../../services/portal.service';

import { ICustomer } from 'src/app/shared/interfaces/customer.interface';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})

export class PaymentConfirmationComponent implements OnInit {
  currentCustomer: ICustomer;
  lob: string;
  completedFlag: boolean = false;
 
  paymentStatus: string;

  constructor(private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private sessionStorageService: SessionStorageService,
    private customerService: CustomerService,
    private portalService: PortalService) { }

  ngOnInit(): void {
    this.sessionStorageService.setPaymentStatus("success");
    this.currentCustomer = this.authenticationService.getLoggedCustomer();
  }

  private updateOnSuccess(response: any, shoppingCart: any ): void {
   
  }

  private updateOnError(response: any): void {
  }

  private updateCustomerOnSuccess(response: any, shoppingCartId: string ): void {
   
    if (response.emailVerificationFlag === true) {
      this.sessionStorageService.setCurrentCustomer(response);
    }
    
    
   /*  let loginUrl = environment.portalLoginUrl;
    let emailRequestModel = {"customerId": response.id, "shoppingCartId": shoppingCartId, "lob": environment.lob, "emailType": "payment-success", "optionalParam": loginUrl};
    this.customerService.sendCustomerEmail(emailRequestModel).subscribe(emailResult => {
      let result = emailResult;
    });   */

    this.completedFlag = true;
  }

  private updateCustomerOnError(response: any): void {
  /*   let emailRequestModel = {"id": response.id, "lob": environment.lob, "emailType": "payment-failure"};
    this.customerService.sendCustomerEmail(emailRequestModel).subscribe(emailResult => {
      let result = emailResult;
    }); */
  }


  goToPortal() {
    this.sessionStorageService.setPaymentStatus(null);
  }

  createInventory(shoppingCart) {
    /* for(var i = 0; i < shoppingCart.shoppingCartItems.length; i++) {
      let inventory: ICustomerInventory = {};
     
      inventory.customerId = shoppingCart.customerId;
      inventory.productId = shoppingCart.shoppingCartItems[i].productId;
      inventory.lob = environment.lob;

      if (this.calendlyEvent !== null && this.calendlyEvent !== undefined) {
        inventory.eventStartDate = this.calendlyEvent.resource.start_time;
        inventory.eventEndDate = this.calendlyEvent.resource.end_time;
        inventory.eventTypeUrl = this.calendlyEvent.resource.event_type;
        inventory.eventUrl = this.calendlyEvent.resource.uri;
        inventory.eventLocationType = this.calendlyEvent.resource.location.type;
        inventory.eventLocationUrl = this.calendlyEvent.resource.location.join_url;
        inventory.eventLocationId = this.calendlyEvent.resource.location.data.id;
      }
  
      if (this.calendlyInvitee !== null && this.calendlyInvitee !== undefined) {
        inventory.eventInviteeCancelUrl = this.calendlyInvitee.resource.cancel_url;
        inventory.eventInviteeRescheduleUrl = this.calendlyInvitee.resource.reschedule_url;
        inventory.eventInviteeName = this.calendlyInvitee.resource.name;
        inventory.eventInviteeEmail = this.calendlyInvitee.resource.email;
        inventory.eventInviteeUrl = this.calendlyInvitee.resource.uri;
      }

      this.customerInventory.push(inventory); */
    //} 
    
    let customer = { id: shoppingCart.customerId, updateSection: "Inventory" };
    let shoppingCartId = shoppingCart.id;

    this.sessionStorageService.setShoppingCart(null);

    this.customerService.updateCustomer(customer).subscribe(
      response => this.updateCustomerOnSuccess(response, shoppingCartId),
      response => this.updateCustomerOnError(response)
    );
  }

  backToMyListings() {
    this.navigationService.navigateToMyListings();
  }
}
