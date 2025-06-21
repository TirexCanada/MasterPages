import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-left-menu-item',
  templateUrl: './left-menu-item.component.html',
  styleUrls: ['./left-menu-item.component.css']
})
export class LeftMenuItemComponent implements OnInit {

  @Input() item: any;
  @Input() itemSelected: boolean;
  
  @Output() selectItem: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  select(item) {
    this.selectItem.emit(item);
  }
}
