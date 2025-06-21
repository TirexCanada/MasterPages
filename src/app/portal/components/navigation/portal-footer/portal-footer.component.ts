import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-portal-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portal-footer.component.html',
  styleUrls: ['./portal-footer.component.css']
})
export class PortalFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}