import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';  
import { Subscription } from 'rxjs';

import { ApplicationService } from '../../../../shared/services/application.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { ClassifiedService } from '../../../../shared/services/classified.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

import { ICategory } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-category-icon',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  providers: [TranslateService],
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.scss'],
})
export class CategoryIconComponent implements OnInit {
  @Input() categoryType: string = "business";
  categories: ICategory [];
  
  constructor(private sessionStorageService: SessionStorageService,
    private classifiedService: ClassifiedService,
    public translateService: TranslateService) { }

  ngOnInit(): void {
    let allCategories = this.sessionStorageService.getCategories();

    if (allCategories == null || allCategories === undefined) {
      let baseRequest = { "requestModelType": "classifiedCategories" }
      this.classifiedService.getCategories(baseRequest).subscribe( response => {
        allCategories = response;
        this.categories = allCategories.filter(x => x.categoryParentId === "" && x.priorityFlag === true && x.categoryImage !== null);
        this.sessionStorageService.setCategories(this.categories);
        this.getCategories(this.categories);
      })
    }
    else {
      //this.categories = allCategories.filter(x => x.categoryParentId === "" && x.priorityFlag === true && x.categoryImage !== null);
      this.categories = allCategories.filter(x => x.categoryParentId === "");
      this.getCategories(this.categories);
    }
  }

  getCategories(allCategories: ICategory[]) {
    if (this.categoryType === "business") {
      this.categories = allCategories.filter(x => x.businessFlag === true);
    }
    else if (this.categoryType === "classified") {
      this.categories = allCategories.filter(x => x.classifiedFlag === true);
    }
  }
}
