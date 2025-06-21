import { ControlContainer, NgForm } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApplicationService } from '../../../../../app/shared/services/application.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-option-question',
  standalone: true,
  imports:[FormsModule, CommonModule],
  templateUrl: './option-question.component.html',
  styleUrls: ['./option-question.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class OptionQuestionComponent implements OnInit {
  public validationData: any;
  @Input() isRequired: boolean;
  @Input() form: NgForm;
  @Input() model;
  @Input() section: string;
  @Input() key: string;

  constructor(public applicationService: ApplicationService) { }

  ngOnInit() {
    this.key = this.key || 'name';
    this.validationData = this.applicationService.getValidationData();
  }
}