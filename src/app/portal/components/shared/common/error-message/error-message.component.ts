import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-error-message',
  standalone: true, 
  imports: [FormsModule, CommonModule],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageComponent implements OnInit, OnChanges {
  @Input() errors: any[];
  
  isSuccess: boolean;
  
  constructor() { }
  
  ngOnInit() {
    if (this.errors && this.errors.length > 0) {
      this.isSuccess = this.errors[0].isSuccess;
    }
  }

  ngOnChanges(changes) {
    if (this.errors && this.errors.length > 0) {
      this.isSuccess = this.errors[0].isSuccess;
    }
  }

  loginNoToken() {
    this.errors = [];
  }
}