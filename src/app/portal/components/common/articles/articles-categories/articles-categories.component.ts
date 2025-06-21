import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
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
import { IArticlesCategory } from '../../../../../shared/interfaces/articles-category.interface';
import { IMessage } from '../../../../../shared/interfaces/message.interface';

@Component({
  selector: 'app-articles-categories',
  standalone: true,
  imports: [CommonModule, TranslateModule, ArticleBlockComponent],
  templateUrl: './articles-categories.component.html',
  styleUrl: './articles-categories.component.scss'
})
export class ArticlesCategoriesComponent {
  @Input()  topArticles: IArticlesCategory [];
  @Input()  topPriorityArticles: IArticlesCategory [];
  @Output() selectCategory: EventEmitter<any> = new EventEmitter<any>();

  isRecentActive: boolean = true;
  articlesCategories: IArticlesCategory[];
 
  constructor( 
    private supportService: SupportService,
    private navigationService: NavigationService
   ) { }

  ngOnInit(): void {
    let baseRequestModel = { "requestModelType": "articlesCategories" };
    this.supportService.getArticlesCategories(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );   
  }

  getOnSuccess(response: any): void {
    this.articlesCategories = response;
    this.articlesCategories = _.sortBy(this.articlesCategories, "sortOrder");
  }

  getOnError(response: any): void {
    //TODO
  }

  getCategoryArticles(id: string) {
    this.navigationService.navigateToArticlesPage(id);
  }
}