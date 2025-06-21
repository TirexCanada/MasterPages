import { ControlContainer, NgForm } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { ApplicationService } from '../../../../../shared/services/application.service';
import { TranslateModule, TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class PasswordInputComponent implements OnInit {
  public validationData: any;
  @Input() isRequired: boolean;
  @Input() form: NgForm;
  @Input() model: any;
  @Input() section: string;
  @Input() submitted: boolean;
  @Input() type: boolean;

  constructor(public applicationService: ApplicationService) { }

  ngOnInit() {
    this.applicationService.getConfig().subscribe(data => {
      this.validationData = data?.validations;
    });
  }
}
