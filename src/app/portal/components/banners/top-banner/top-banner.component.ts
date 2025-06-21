import { Component, OnInit, OnChanges, OnDestroy, Input, Renderer2, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';  
import { Subscription } from 'rxjs';

import { ApplicationService } from '../../../../shared/services/application.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { ClassifiedService } from '../../../../shared/services/classified.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

import { IBanner } from '../../../../shared/interfaces/banner.interface';

@Component({
  selector: 'app-top-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.scss'
})
export class TopBannerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() topActiveBanners: IBanner[] | null = [];
  changeBannerCounter = 0;
  backgroundImageUrl: string = '';
  intervalId: any;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.updateBackgroundImage();
    this.intervalId = setInterval(() => {
      this.changeBannerCounter = (this.changeBannerCounter + 1) % this.topActiveBanners.length;
      this.updateBackgroundImage();
    }, 8000);
  }

  ngOnChanges() {
    this.updateBackgroundImage();
  }

  /* updateBackgroundImage(): void {
    this.backgroundImageUrl = 'http://localhost:51378/images/classifiedimages/banners/customers/' + this.topActiveBanners[this.changeBannerCounter]?.id + '.jpg';
  } */


  updateBackgroundImage(): void {
    this.backgroundImageUrl = 'https://classifiedwebapi.azurewebsites.net/images/classifiedimages/banners/customers/' + this.topActiveBanners[this.changeBannerCounter]?.id + '.jpg';
    const bannerElement = this.el.nativeElement.querySelector('.banner');
    this.renderer.setStyle(bannerElement, 'background-image', `url(${this.backgroundImageUrl})`);
    this.renderer.addClass(bannerElement, 'show');
    setTimeout(() => {
      this.renderer.removeClass(bannerElement, 'show');
    }, 6500); // Match the duration of the transition
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
