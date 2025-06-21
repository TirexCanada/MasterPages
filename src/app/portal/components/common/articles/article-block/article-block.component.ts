import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';  
import { DateFormatLongPipe } from '../../../../../shared/pipes/date-format-long.pipe';
import { IArticle } from '../../../../../shared/interfaces/article.interface';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { NavigationService } from '../../../../../shared/services/navigation.service';

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-article-block',
  standalone: true,
  imports: [CommonModule, RouterModule, DateFormatLongPipe, TranslateModule],
  templateUrl: './article-block.component.html',
  styleUrl: './article-block.component.scss'
})
export class ArticleBlockComponent {

  @Input() article: any;
  @Input() location: string;
  @Input() currentView: string;

  webApiUrl: string;
  articleImageUrl: string;
  
  
  @HostListener('error')
  onError() {
    this.articleImageUrl = "/assets/images/articles/article1.jpg";
  }

  constructor(private navigationService: NavigationService ) { 
    this.webApiUrl = environment.baseUrl;
  }

  ngOnInit(): void {
    this.articleImageUrl = "/assets/images/articles/article1.jpg";
    this.setArticleImageUrl();
  }

  ngOnChanges(): void {
    this.setArticleImageUrl();
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

  getArticle(article: IArticle) {
    this.navigationService.navigateToArticlePage(article.id);
  }
}
