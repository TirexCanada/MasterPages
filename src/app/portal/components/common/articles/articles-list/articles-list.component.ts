import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';  
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

import { ArticleBlockComponent } from '../article-block/article-block.component';

import { SupportService } from '../../../../../shared/services/support.service';
import { CustomerService } from '../../../../../shared/services/customer.service';
import { ClassifiedService } from '../../../../../shared/services/classified.service';
import { SessionStorageService } from '../../../../../shared/services/session-storage.service';
import { NavigationService } from '../../../../../shared/services/navigation.service';

import { ICustomer } from '../../../../../shared/interfaces/customer.interface';
import { IArticle } from '../../../../../shared/interfaces/article.interface';
import { IMessage } from '../../../../../shared/interfaces/message.interface';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, ArticleBlockComponent],
  providers: [ CustomerService, ClassifiedService, SessionStorageService, NavigationService, TranslateService],
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit, OnChanges {
  @Input()  topArticles: IArticle [];
  @Input()  topPriorityArticles: IArticle [];

  isRecentActive: boolean = true;
  articles: IArticle[];
  currentView: string = "list";
 
  constructor(private supportService: SupportService) { }

  ngOnInit(): void {
    this.getArticles("recent");
    //this.getAllArticles();
  }

  getAllArticles() {
    let baseRequestModel = { "requestModelType": "articles" };
    this.supportService.getArticles(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );   
  }

  getOnSuccess(response: any): void {
    //this.articles = response;
    this.topArticles = response;
    //this.topArticles = JSON.parse(JSON.stringify(this.articles));
    this.getArticles("recent");
  }

  private getOnError(response: any): void {
    //TODO
  }

  ngOnChanges(): void {
    this.getArticles("recent");
  }

  getArticles(flag) {
    if (flag === "recent") {
      this.isRecentActive = true;
      if (this.topArticles !== null && this.topArticles !== undefined) {
        this.articles = JSON.parse(JSON.stringify(this.topArticles));
      }
    }
    else {
      this.isRecentActive = false;
      if (this.topArticles !== null && this.topPriorityArticles !== undefined) {
        this.articles = JSON.parse(JSON.stringify(this.topPriorityArticles));
      }
    }
  }

  toggle(view: string) {
    this.currentView = view;
  }
}
