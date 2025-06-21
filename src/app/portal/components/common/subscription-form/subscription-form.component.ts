import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {
  model: any;

  @ViewChild('subscriptionForm', { static: true }) subscriptionForm: NgForm;

  constructor() { }

  ngOnInit(): void {
    this.model = { "searchtext": ""}
  }

  onSubmit() {
    
  }
}
