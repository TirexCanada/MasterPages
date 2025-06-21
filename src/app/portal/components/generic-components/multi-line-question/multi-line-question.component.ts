import { Component, OnInit, OnChanges, Input, forwardRef } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR, ControlValueAccessor, ControlContainer } from '@angular/forms';
import { ApplicationService } from '../../../../../app/shared/services/application.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { InputValidatorDirective } from '../../../../../app/shared/directives/input-validator.directive';

export const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiLineQuestionComponent),
  multi: true
}

@Component({
  selector: 'app-multi-line-question',
  standalone: true,
  imports:[FormsModule, CommonModule, InputValidatorDirective],
  templateUrl: './multi-line-question.component.html',
  styleUrls: ['./multi-line-question.component.css'],
  providers: [DEFAULT_VALUE_ACCESSOR],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class MultiLineQuestionComponent implements OnInit, OnChanges {
  @Input() form: NgForm;
  @Input() title: string;
  @Input() model: any;
  @Input() modelName: any;
  @Input() defaultValue: string;
  @Input() controlName: string;
  @Input() isRequired: boolean;
  @Input() isDisabled: boolean;
  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() inputValidator: string;
  @Input() inlineFlag: boolean;
  @Input() placeholder: string;
  @Input() largeFlag: boolean;

  fn: (value: any) => void;
  innerModel: any;
  uid: string;
  charCount: number;

  validationData: any;

  constructor(public applicationService: ApplicationService) { }

  ngOnInit() {
    this.innerModel = this.model && this.model[this.modelName];
    //this.uid = this.utilService.getUUID();
    this.validationData = this.applicationService.getValidationData();
    this.charCount = (this.innerModel) ? this.innerModel.length : 0;
  }

  
  get innerValue(): string {
    return this.innerModel;
  };

  set innerValue(value: string) {
    if (value !== this.innerModel) {
      this.innerModel = value;
      this.model[this.modelName] = value;
      //this.fn(value);
    }
  }

  writeValue(value: any) {
    let v = value?.value;
    if (v !== this.innerModel) {
       this.innerValue = v;
       this.innerModel = v;
    }
  }

  onKeyUp(event: any) {
    let value = event.target.value;
    this.charCount = value.length;
  };

  
  registerOnChange(fn: any) {
    //this.fn = fn;
  }

  registerOnTouched(fn: any) {
    //this.fn = fn;
  }

  ngOnChanges() {
    this.innerModel = this.model && this.model[this.modelName];
  }
}