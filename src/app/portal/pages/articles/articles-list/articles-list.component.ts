import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';  
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

import { ArticleBlockComponent } from '../../../components/common/articles/article-block/article-block.component';

import { SupportService } from '../../../../shared/services/support.service';
import { CustomerService } from '../../../../shared/services/customer.service';
import { ClassifiedService } from '../../../../shared/services/classified.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ICustomer } from '../../../../shared/interfaces/customer.interface';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { IMessage } from '../../../../shared/interfaces/message.interface';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, ArticleBlockComponent],
  providers: [ CustomerService, ClassifiedService, SessionStorageService, NavigationService, TranslateService],
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit, OnChanges {
  categoryId: string;
  isRecentActive: boolean = true;
  articles: IArticle[];
  articlesOrg: IArticle[];
  topArticles: IArticle [];
  topPriorityArticles: IArticle []; 

  currentView: string = "list";
 
  constructor(
    private supportService: SupportService,
    private activatedRoute: ActivatedRoute,
  ) { 
   /*  this.activatedRoute.params.subscribe(params => {
      this.categoryId = params['id'];
    }); */
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = params['id'];

      let baseRequestModel = { "requestModelType": "articles" };
      this.supportService.getArticles(baseRequestModel).subscribe(
        response => this.getOnSuccess(response),
        response => this.getOnError(response)
      ); 
    });

    /* let baseRequestModel = { "requestModelType": "articles" };
    this.supportService.getArticles(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );    */
  }

  getAllArticles() {
    let baseRequestModel = { "requestModelType": "articles" };
    this.supportService.getArticles(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );   
  }

  getOnSuccess(response: any): void {
    this.articles = response;
    this.articlesOrg = response;
    if (this.categoryId !== undefined && this.categoryId !== null) {
      if (this.categoryId === "all-categories") {
        this.articles = this.articlesOrg;
      }
      else {
        this.articles = this.articlesOrg.filter(article => 
          article.articleCategories?.some(category => category.articleCategoryId === this.categoryId)
        );
      }
    }
    else {
      //this.articles = response;
      this.topArticles = response;
      //this.topArticles = JSON.parse(JSON.stringify(this.articles));
      this.getArticles("recent");
    }
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
