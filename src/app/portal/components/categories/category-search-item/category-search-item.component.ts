import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ICategory } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-category-search-item',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './category-search-item.component.html',
  styleUrls: ['./category-search-item.component.css']
})
export class CategorySearchItemComponent implements OnInit {
  @Input() category: any;
  @Input() tagId: string;

  constructor() { }

  ngOnInit(): void {
    
  }
}
