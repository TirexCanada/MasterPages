import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';

import { ApplicationService } from 'src/app/shared/services/application.service';
import { ClassifiedService } from 'src/app/shared/services/classified.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { RegistrationService } from 'src/app/shared/services/registration.service';
import { IMarketingCampaign } from 'src/app/shared/interfaces/marketing-campaign.interface';

@Component({
  selector: 'app-full-page-banner',
  templateUrl: './full-page-banner.component.html',
  styleUrls: ['./full-page-banner.component.css']
})
export class FullPageBannerComponent implements OnInit {

  marketingCampaign: IMarketingCampaign;

  constructor(private router: Router,
    private applicationService: ApplicationService,
    private classifiedService: ClassifiedService,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private customerService: CustomerService,
    private registrationService: RegistrationService,
    private sessionStorageService: SessionStorageService) {
  }

  ngOnInit(): void {
    let baseRequestModel = { "requestModelType": "Horizontal" };
    this.classifiedService.getCurrentMarketingCampaign(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );   
  }

  getOnSuccess(response: any): void {
    this.marketingCampaign = response;
    this.marketingCampaign.marketingImage = environment.baseUrl + this.marketingCampaign.marketingImage;
  }

  private getOnError(response: any): void {
    //TODO
  }

  marketingCampaignClick() {
    let subject = this.marketingCampaign.marketingCampaignButtonInformation.emailSubject;
    let message = this.marketingCampaign.marketingCampaignButtonInformation.emailMessage;

    let params = "subject=" + subject + "&message=" + message;

    this.navigationService.navigateToContact(params);
  }
}