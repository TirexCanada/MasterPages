import { Component, OnInit, OnChanges, AfterViewChecked, Input, Output, forwardRef, ChangeDetectionStrategy, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR, ControlValueAccessor, ControlContainer } from '@angular/forms';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  

export const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioInputQuestionComponent),
  multi: true
}

@Component({
  selector: 'app-radio-input-question',
  standalone: true,
  imports:[FormsModule, CommonModule, TranslateModule],
  templateUrl: './radio-input-question.component.html',
  styleUrls: ['./radio-input-question.component.css'],
  providers: [DEFAULT_VALUE_ACCESSOR, TranslateService],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  //changeDetection: ChangeDetectionStrategy.OnPush
})


export class RadioInputQuestionComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() form: NgForm;
  @Input() title: any;
  @Input() title1: any;
  @Input() model: any;
  @Input() customerModel: any;
  @Input() data: any[];
  @Input() modelName: any;
  @Input() defaultValue: string;
  @Input() controlName: string;
  @Input() isRequired: boolean;
  @Input() isDisabled: boolean;
  @Input() isDescriptionRequired: boolean;
  @Input() source: string;
  @Input() inlineFlag: boolean;
  @Input() tooltipFlag: boolean;
  @Input() marriageFlag: boolean;

  @Output() selectItem: EventEmitter<any> = new EventEmitter<any>();
  
  fn: (value: any) => void;
  innerModel: any;
  selectedItemText: string;
  selectedItemDescription: string;
  btn: any;

  constructor(public translateService: TranslateService) {
  }

  ngOnInit() {
    this.innerModel = this.model && this.model[this.modelName];
    this.selectedItemText = "";
    this.selectedItemDescription = "";
  } 

  ngOnChanges() {
    this.innerModel = this.model && this.model[this.modelName];
    this.selectedItemText = "";
    this.selectedItemDescription = "";
  }

  /* ngAfterViewChecked() {
    setTimeout(() => {
      this.btn = document.getElementById("modalButton");
    });
  }  */
    

  get innerValue(): any {
    return this.innerModel;
  };

  set innerValue(value: any) {
    if (value !== this.innerModel) {
      this.innerModel = value;
      this.model[this.modelName] = value;

     /*  if (this.model) {
        this.model[this.modelName] = value;
      } */
      //this.fn(value);
    }
  }

  writeValue(value: any) {
    if(value === undefined || value === null) {
      value = this.defaultValue;
      this.selectedItemText = "";
      this.selectedItemDescription = "";
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
