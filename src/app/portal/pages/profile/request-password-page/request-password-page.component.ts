import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd} from '@angular/router';

import { NavigationService } from 'src/app/shared/services/navigation.service';

import { ICustomer } from 'src/app/shared/interfaces/customer.interface';
import { IMessage } from 'src/app/shared/interfaces/message.interface';

@Component({
  selector: 'request-password-page',
  templateUrl: './request-password-page.component.html',
  styleUrls: ['./request-password-page.component.css']
})

export class RequestPasswordPageComponent implements OnInit {
  currentCustomer: ICustomer;
  submitted: boolean;
  model: any;
  serverErrors: IMessage [];
  isBackEnabled: boolean;
  token: string;

  @ViewChild('form', { static: true }) form: NgForm;

  constructor(private location: Location,
    private navigationService: NavigationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
      router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.activatedRoute.data.subscribe(data => {
            this.currentCustomer = data.currentCustomer;
          });
          this.activatedRoute.queryParams.subscribe(params => {
            this.token = params['token'];
          });
        } 
    });
  }

  ngOnInit() {
    this.submitted = false;
    this.isBackEnabled = false;
    this.model = { "password": { "password": "" }, "confirmPassword": { "password": "" } };
  }

  onSubmitForm(response) {
    this.serverErrors = response;
    this.isBackEnabled = true;
  }
  
  onSubmitFailed(response) {
    this.serverErrors = response;
  }

  onCancelForm() {
    this.location.back();
  }

  backToPortal() {
    this.navigationService.navigateToLogin();
  }
}