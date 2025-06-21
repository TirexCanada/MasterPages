import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  

import { ApplicationService } from '../../../../shared/services/application.service';
import { CustomerService } from '../../../../shared/services/customer.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { AuthenticationService } from "../../../../shared/services/authentication.service";
import { OneLineQuestionComponent } from '../../../components/generic-components/one-line-question/one-line-question.component';

import { ICustomer } from '../../../../shared/interfaces/customer.interface';
import { ICustomerSocialProfiles } from '../../../../shared/interfaces/customer-socialprofiles.interface';
import { IMessage } from '../../../../shared/interfaces/message.interface';


@Component({
  selector: 'app-social-profiles',
  standalone: true, 
  imports: [FormsModule, CommonModule, TranslateModule, OneLineQuestionComponent],
  providers: [AuthenticationService, ApplicationService],
  templateUrl: './social-profiles.component.html',
  styleUrls: ['./social-profiles.component.css']
})
export class SocialProfilesComponent implements OnInit {
  @Input() currentCustomer: ICustomerSocialProfiles;
  @Input() model: ICustomer;
  @Input() form: NgForm;
  @Input() submitted: boolean;
  @Input() isDisabled: boolean = true;
  
  orgModel: ICustomerSocialProfiles;
  customerModel: any;
  validationData: any;
  section: string;
  defaultCountry: string;
  serverErrors: IMessage [];

  showNavigationButtons: boolean = false;

  destroyed = new Subject<any>();
   
  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.validationData = this.applicationService.getValidationData();
    //this.model = JSON.parse(JSON.stringify(this.currentCustomer));
  }

}
