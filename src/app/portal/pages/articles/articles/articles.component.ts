import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatPipe } from '../../../../shared/pipes/date-format.pipe';
import { DateFormatLongPipe } from '../../../../shared/pipes/date-format-long.pipe';
import { RouterModule } from '@angular/router'; 

import { ApplicationService } from '../../../../shared/services/application.service';
import { SupportService } from '../../../../shared/services/support.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { CustomerService } from '../../../../shared/services/customer.service';
import { RegistrationService } from '../../../../shared/services/registration.service';
import { ErrorMessageComponent } from '../../../components/shared/common/error-message/error-message.component'; 
import { ListingMainComponent } from '../../../components/common/listings/listing-main/listing-main.component';
import { ListingContactInfoComponent } from '../../../components/common/listings/listing-contact-info/listing-contact-info.component';
/* import { ListingContactFormComponent } from '../../components/common/listings/listing-contact-form/listing-contact-form.component'; */
import { MapComponent } from '../../../components/common/map/map.component';
import { ListingTagsComponent } from '../../../components/tags/listing-tags/listing-tags.component';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { ArticlesListComponent } from '../articles-list/articles-list.component';
import { ArticlesCategoriesComponent } from '../../../components/common/articles/articles-categories/articles-categories.component';
import { TopBannerComponent } from '../../../components/banners/top-banner/top-banner.component';


@Component({
  selector: 'app-articles',
  standalone: true, 
  imports: [CommonModule, TranslateModule, FormsModule, ErrorMessageComponent, ArticlesComponent, ListingMainComponent, NgbPopover, ArticlesListComponent, ArticlesCategoriesComponent, TopBannerComponent, RouterModule],
  providers: [SupportService, ApplicationService, AuthenticationService, NavigationService, SessionStorageService, CustomerService, DateFormatPipe, DateFormatLongPipe, RegistrationService],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articleId: string;
  article: IArticle;
  categoryId: string;

  articles: IArticle [];
  articlesOrg: IArticle [];

  /* tags: any[];
  listingTags: any[]; */

 /*  mapLocation: any;
  lat: any;
  lng: any; */
 
  constructor(private router: Router,
    private applicationService: ApplicationService,
    private supportService: SupportService,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private customerService: CustomerService,
    private registrationService: RegistrationService,
    private sessionStorageService: SessionStorageService,
    private activatedRoute: ActivatedRoute) { 
      /* this.activatedRoute.params.subscribe(params => {
        this.categoryId = params['id'];
      }); */
    }

  ngOnInit(): void {
   /*  let baseRequestModel = { "requestModelType": "articles" };
    this.supportService.getArticles(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );    */
  }

 
  // getOnSuccess(response: any): void {
  //   this.articles = response;
  //   this.articlesOrg = JSON.parse(JSON.stringify(this.articles));
  // }

  // private getOnError(response: any): void {
  //   //TODO
  // }

  // onSelectCategory(categoryId: string) {
  //   //this.articles = this.articles.filter( x => x.articleCategories?.articleCategoryId === categoryId);
  //   /* this.articles = this.articlesOrg.filter(article => 
  //     article.articleCategories?.some(category => category.articleCategoryId === categoryId)
  //   ; */
  // }
}
