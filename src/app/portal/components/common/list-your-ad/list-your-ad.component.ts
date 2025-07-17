import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

@Component({
  selector: 'app-list-your-ad',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  providers: [TranslateService],
  templateUrl: './list-your-ad.component.html',
  styleUrl: './list-your-ad.component.scss'
})
export class ListYourAdComponent {

}
