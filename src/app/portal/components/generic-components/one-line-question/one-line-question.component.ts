import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR, ControlValueAccessor, ControlContainer } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { InputValidatorDirective } from '../../../../../app/shared/directives/input-validator.directive';

import { UtilService } from '.././../../../../app/shared/services/util.service';

export const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OneLineQuestionComponent),
  multi: true
}

@Component({
  selector: 'app-one-line-question',
  standalone: true,
  imports:[FormsModule, CommonModule, InputValidatorDirective],
  templateUrl: './one-line-question.component.html',
  styleUrls: ['./one-line-question.component.css'],
  providers: [CurrencyPipe, UtilService, DEFAULT_VALUE_ACCESSOR],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})


export class OneLineQuestionComponent implements OnInit, ControlValueAccessor {
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
  @Input() appEmail: string;
  @Input() pipe: string;
  @Input() placeholder: string;
  @Input() largeFlag: boolean;

  
  fn: (value: any) => void;
  innerModel: any;
  uid: string;

  constructor(private currencyPipe: CurrencyPipe,
    private utilService: UtilService) {
  }

  ngOnInit() {
    this.innerModel = this.model && this.model[this.modelName];
    //this.uid = this.utilService.getUUID();
  }

  get innerValue(): any {
    return this.innerModel;
  };

  set innerValue(value: any) {
    if (value !== this.innerModel) {
      this.innerModel = value;
      this.model[this.modelName] = value;

      //this.fn(value);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerModel) {
       this.innerModel = value;
    }
  }

  registerOnChange(fn: any) {
    this.fn = fn;
  }

  registerOnTouched(fn: any) {
    //this.fn = fn;
  }
}
