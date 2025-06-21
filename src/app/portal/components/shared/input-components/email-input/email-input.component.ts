import { ControlContainer, NgForm } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  

import { ApplicationService } from '../../../../../shared/services/application.service';

@Component({
  selector: 'app-email-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class EmailInputComponent implements OnInit {
  validationData: any;
  
  @Input() location: string;
  @Input() isRequired: boolean;
  @Input() section: string;
  @Input() form: NgForm;
  @Input() model: any;
  @Input() submitted: boolean;
  @Input() validate: boolean;
  @Input() emailPlaceholder: string;
  @Input() title: string;
  @Input() inlineFlag: boolean;

  constructor(public applicationService: ApplicationService) { }

  ngOnInit() {
    this.applicationService.getConfig().subscribe(data => {
      this.validationData = data?.validations;
    });
  }
}
