import { Component, OnInit } from '@angular/core';


import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

import { IFaq } from "src/app/shared/interfaces/faq.interface";
import { IFaqCategory } from "src/app/shared/interfaces/faq-category.interface";


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqs: IFaq [];
  faqCategories: IFaqCategory [];

  constructor(private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    this.faqs = this.sessionStorageService.getFaqs();
    this.faqCategories = this.sessionStorageService.getFaqCategories();
  }
}
