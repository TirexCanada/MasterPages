import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router'; 


//import { PortalModule } from '../../../portal.module';

import { CategoryBlockComponent } from '../category-block/category-block.component';

import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { ClassifiedService } from '../../../../shared/services/classified.service';

import { ICategory } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, CategoryBlockComponent],
  providers: [SessionStorageService, ClassifiedService],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any [] = [];

  constructor(private sessionStorageService: SessionStorageService,
    private classifiedService: ClassifiedService) { }

  ngOnInit(): void {
    let allCategories: any[] | null = this.sessionStorageService.getCategories();

    if (allCategories == null || allCategories === undefined) {
      let baseRequest = { "requestModelType": "classifiedCategories" }
      this.classifiedService.getCategories(baseRequest).subscribe( response => {
        allCategories = response;
        this.sessionStorageService.setCategories(this.categories);
        this.categories = allCategories?.filter((x: any) => x.categoryParentId === "");
        this.categories.map(x => {
          x.subcategoriesInformation = x.subcategoriesInformation?.filter(x => x.priorityFlag === true)
        })
      })
    }
    else {
      this.categories = allCategories.filter(x => x.categoryParentId === "");
      this.categories.map(x => {
        x.subcategoriesInformation = x.subcategoriesInformation?.filter(x => x.priorityFlag === true)
      })
    }
  }
}
