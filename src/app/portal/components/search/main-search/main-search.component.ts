import { Component } from '@angular/core';

import { CategoryIconComponent } from '../../categories/category-icon/category-icon.component';

@Component({
  selector: 'app-main-search',
  standalone: true, 
  imports: [CategoryIconComponent],
  templateUrl: './main-search.component.html',
  styleUrl: './main-search.component.scss'
})
export class MainSearchComponent {

}
