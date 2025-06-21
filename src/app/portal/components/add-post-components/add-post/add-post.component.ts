import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  

import { ApplicationService } from '../../../../../app/shared/services/application.service';
import { CustomerService } from '../../../../../app/shared/services/customer.service';
import { SessionStorageService } from '../../../../../app/shared/services/session-storage.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { AuthenticationService } from "../../../../shared/services/authentication.service";
import { MultiLineQuestionComponent } from '../../../components/generic-components/multi-line-question/multi-line-question.component';
import { OneLineQuestionComponent } from '../../../components/generic-components/one-line-question/one-line-question.component';

import { ICustomer } from '../../../../../app/shared/interfaces/customer.interface';
import { IListing } from '../../../../../app/shared/interfaces/listing.interface';
import { IMessage } from '../../../../../app/shared/interfaces/message.interface';

@Component({
  selector: 'app-add-post',
  standalone: true, 
  imports: [FormsModule, CommonModule, TranslateModule, MultiLineQuestionComponent, OneLineQuestionComponent],
  providers: [AuthenticationService],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit, OnChanges {
  @Input() currentCustomer: ICustomer;
  @Input() model: IListing;
  @Input() mode: string;
  @Input() form: NgForm;
  @Input() submitted: boolean;

  orgModel: ICustomer;
  customerModel: any;
  validationData: any;
  section: string;
  serverErrors: IMessage [];
  showNavigationButtons: boolean = false;
  isDisabled: boolean = false;

  destroyed = new Subject<any>();
 
  constructor( private location: Location,
    private activatedRoute: ActivatedRoute,
    private applicationService: ApplicationService,
    private customerService: CustomerService,
    private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    this.validationData = this.applicationService.getValidationData();

    if (this.mode === 'delete') {
      this.isDisabled = true;
    }
  }

  ngOnChanges(): void {
    
  }

}
