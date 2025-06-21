import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { DateFormatLongPipe } from '../../../../shared/pipes/date-format-long.pipe';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { SupportService } from '../../../../shared/services/support.service';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, RouterModule, DateFormatLongPipe, TranslateModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  articleId: string;
  article: any;
  location: string;
  currentView: string;

  webApiUrl: string;
  articleImageUrl: string;
  
  @HostListener('error')
  onError() {
    this.articleImageUrl = "/assets/images/articles/article1.jpg";
  }

  constructor(
    private navigationService: NavigationService,
    private supportService: SupportService,
    private activatedRoute: ActivatedRoute) { 
      this.activatedRoute.params.subscribe(params => {
        this.articleId = params['id'];
      });
      this.webApiUrl = environment.baseUrl;
  }    
  

  ngOnInit(): void {
    //this.articleImageUrl = "/assets/images/articles/article1.jpg";
    //this.setArticleImageUrl();

    let baseRequestModel = { "id": this.articleId };
    this.supportService.getArticle(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );   
  }

  ngOnChanges(): void {
    this.setArticleImageUrl();
  }

  getOnSuccess(response: any): void {
    this.article = response;
  }

  private getOnError(response: any): void {
    //TODO
  }

  setArticleImageUrl() {
    /* if (this.listing.listingImageUrl === undefined || this.listing.listingImageUrl === null) {
      this.listing.listingImageUrl = this.listingImageUrl; 
    }
    else {
      if (this.listing.listingImageUrl.indexOf("https://") > -1) {
      }
      else {
        let listingImageUrl = this.webApiUrl + this.listing.listingImageUrl;
        if (this.isFileExist(listingImageUrl) === false) {
          this.listing.listingImageUrl = this.listingImageUrl; 
        }
        else {
          this.listing.listingImageUrl = listingImageUrl; 
        }
      }
    } */
  }

  isFileExist(urlToFile)
  {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if(xhr.status != 200) {
      return false;
    }
    else {
      return true;
    }
  }
}
