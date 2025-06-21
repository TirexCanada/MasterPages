import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { takeUntil } from 'rxjs/operators';

import { ApplicationService } from '../../../../../app/shared/services/application.service';
import { CustomerService } from '../../../../../app/shared/services/customer.service';
import { SessionStorageService } from '../../../../../app/shared/services/session-storage.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { AuthenticationService } from "../../../../shared/services/authentication.service";
import { OneLineQuestionComponent } from '../../../components/generic-components/one-line-question/one-line-question.component';

import { ICustomer } from '../../../../../app/shared/interfaces/customer.interface';
import { IMessage } from '../../../../../app/shared/interfaces/message.interface';


@Component({
  selector: 'app-profile-info',
  standalone: true, 
  imports: [FormsModule, CommonModule, TranslateModule, OneLineQuestionComponent],
  providers: [AuthenticationService, ApplicationService],
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})

export class ProfileInfoComponent implements OnInit, OnChanges {
  @Input() currentCustomer: ICustomer;
  @Input() model: ICustomer;
  @Input() form: NgForm;
  @Input() submitted: boolean;
  @Input() isDisabled: boolean = true;


  orgModel: ICustomer;
  customerModel: any;
  validationData: any;
  section: string;
  defaultCountry: string;
  serverErrors: IMessage [];

  showNavigationButtons: boolean = false;

  destroyed = new Subject<any>();


  constructor( private location: Location,
    private activatedRoute: ActivatedRoute,
    private applicationService: ApplicationService,
    private customerService: CustomerService,
    private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    this.validationData = this.applicationService.getValidationData();
  }

  ngOnChanges() {

  }
}
