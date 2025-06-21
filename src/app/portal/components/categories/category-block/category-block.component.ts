import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';  

import { ICategory } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-category-block',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.scss']
})
export class CategoryBlockComponent implements OnInit {
  @Input() category: ICategory;

  constructor() { }

  ngOnInit(): void {
    
  }
}
