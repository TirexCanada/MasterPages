import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router'; 

import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { ApplicationService } from '../../../../shared/services/application.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { CustomerService } from '../../../../shared/services/customer.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

import { ICustomer } from '../../../../shared/interfaces/customer.interface';


@Component({
  selector: 'app-logged-customer',
  standalone: true, 
  imports: [RouterModule, FormsModule, CommonModule, TranslateModule],
  templateUrl: './logged-customer.component.html',
  styleUrls: ['./logged-customer.component.css']
})

export class LoggedCustomerComponent implements OnInit {

    @Input() customer: ICustomer;
    canEditFlag: boolean = false;

    destroyed = new Subject<any>();

    constructor(private authenticationService: AuthenticationService,
      private applicationService: ApplicationService,
      private customerService: CustomerService,
      private navigationService: NavigationService) { }

    ngOnInit() {
      
    }

    logout() {
      this.authenticationService.logout();
      this.navigationService.navigateToHomePage();
    }
    

    getCustomer(customer: ICustomer) {
      /* customer = this.applicationService.buildCustomerName(customer.firstName, customer.lastName);
      return this.applicationService.buildCustomerName(customer.firstName, customer.lastName);     */
    }  

    onToggleClick() {
      //console.log('Dropdown toggle clicked');
    }

    ngOnDestroy() { 
      //this.destroyed.next();
      this.destroyed.complete();
    }
}