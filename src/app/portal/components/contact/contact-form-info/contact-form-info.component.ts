import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form-info',
  templateUrl: './contact-form-info.component.html',
  styleUrls: ['./contact-form-info.component.css']
})
export class ContactFormInfoComponent implements OnInit {

  @Input() location: string;

  constructor() { }

  ngOnInit(): void {
  }

}
