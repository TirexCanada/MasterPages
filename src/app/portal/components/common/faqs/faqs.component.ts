import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import {NgbAccordion} from '@ng-bootstrap/ng-bootstrap';

import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

import { IFaq } from "src/app/shared/interfaces/faq.interface";
import { IFaqCategory } from "src/app/shared/interfaces/faq-category.interface";

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit, OnChanges {
  @Input() faqs: IFaq [];
  @Input() faqCategories: IFaqCategory [];
  @Input() categoryFaqs: IFaq [];

  selectedTabSortOrder: number = 1;

  @ViewChild('acc', { static: true }) acc: NgbAccordion;

  constructor(private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    if (this.faqCategories !== null && this.faqCategories !== undefined && this.faqCategories.length > 0) {
      this.categoryFaqs = this.faqs.filter(x => x.faqCategoryId === this.faqCategories[0].id);
    }
  }

  ngOnChanges(): void {
    this.faqCategories = this.faqCategories;
  }

  selectTab(faqCategory:IFaqCategory) {
    this.selectedTabSortOrder = faqCategory.sortOrder;
    if (this.faqCategories !== null && this.faqCategories !== undefined && this.faqCategories.length > 0) {
      this.categoryFaqs = this.faqs.filter(x => x.faqCategoryId === faqCategory.id);
    }
  }

  expandAll() {
    this.acc.expandAll();
    window.scrollTo(0, 0)
  }

  collapseAll() {
    this.acc.collapseAll();
    window.scrollTo(0, 0)
  }
}
