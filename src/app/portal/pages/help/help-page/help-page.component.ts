import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { DateFormatLongPipe } from '../../../../shared/pipes/date-format-long.pipe';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { SupportService } from '../../../../shared/services/support.service';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-help-page',
  standalone: true,
  imports: [CommonModule, RouterModule, DateFormatLongPipe, TranslateModule],
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.scss'
})
export class HelpPageComponent {
  contentUrl: string;
  content: any;

  webApiUrl: string;
    
  constructor(
    private supportService: SupportService,
    private activatedRoute: ActivatedRoute,
    public translateService: TranslateService) { 
      this.activatedRoute.params.subscribe(params => {
        this.contentUrl = params['url'];
        this.getContent(this.contentUrl);
      });
      this.webApiUrl = environment.baseUrl;
  }    
  

  getContent(contentUrl: string) {
    let baseRequestModel = { "id": contentUrl };
    this.supportService.getContent(baseRequestModel).subscribe(
      response => this.getOnSuccess(response),
      response => this.getOnError(response)
    );   
  }

  getOnSuccess(response: any): void {
    this.content = response;
  }

  private getOnError(response: any): void {
    //TODO
  }
}
