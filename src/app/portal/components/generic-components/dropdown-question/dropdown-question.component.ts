import { Component, OnInit, OnChanges, ChangeDetectionStrategy, ViewEncapsulation, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR, ControlValueAccessor, ControlContainer } from '@angular/forms';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { InputValidatorDirective } from '../../../../../app/shared/directives/input-validator.directive';

export const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownQuestionComponent),
  multi: true
}

@Component({
  selector: 'app-dropdown-question',
  standalone: true,
  imports:[FormsModule, CommonModule, InputValidatorDirective, TranslateModule],
  templateUrl: './dropdown-question.component.html',
  styleUrls: ['./dropdown-question.component.css'],
  providers: [DEFAULT_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }, TranslateService],
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class DropdownQuestionComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() form: NgForm;
  @Input() title: string;
  @Input() model: any;
  @Input() data: any;
  @Input() modelName: any;
  @Input() backgroundColor: boolean;
  @Input() defaultValue: string;
  @Input() defaultText: string;
  @Input() controlName: string;
  @Input() isRequired: boolean;
  @Input() isDisabled: boolean;
  @Input() inlineFlag: boolean;
  @Input() newValue: string;

  @Output() selectItem: EventEmitter<any> = new EventEmitter<any>();
  
  fn: (value: any) => void;
  innerModel: any;

  constructor( public translateService: TranslateService) {
   
  }

  ngOnInit() {
    this.innerModel = this.model && this.model[this.modelName];
  }

  ngOnChanges(changes) {
    if (changes && changes.newValue !== undefined && changes.newValue.currentValue !== undefined) {
      this.innerValue = changes.newValue.currentValue;
    }
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
    if(value === undefined || value === null) {
      value = this.defaultValue;
    }

    if (value !== this.innerModel) {
       this.innerModel = value;
    }

    this.selectItem.emit(value);
  }

  registerOnChange(fn: any) {
    this.fn = fn;
  }
  registerOnTouched(fn: any) {
    //this.fn = fn;
  }
}
