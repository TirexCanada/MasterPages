import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-classified-search',
  templateUrl: './classified-search.component.html',
  styleUrls: ['./classified-search.component.css']
})
export class ClassifiedSearchComponent implements OnInit {

  @Output() submitSearch: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

  }

  onSubmitSearch(listings) {
    this.submitSearch.emit(listings);
  }
}
