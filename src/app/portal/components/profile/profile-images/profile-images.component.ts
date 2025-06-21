import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-images',
  templateUrl: './profile-images.component.html',
  styleUrls: ['./profile-images.component.css']
})
export class ProfileImagesComponent implements OnInit {

  url: any;

  constructor() { }

  ngOnInit(): void {
    this.url = "";

    /* if (this.selectedMarketingCampaign.marketingImage !== null && this.selectedMarketingCampaign.marketingImage !== undefined) {
      this.url = environment.baseUrl + this.selectedMarketingCampaign.marketingImage;
    } */
  }

  onSelectFile(e) {

  }

}
