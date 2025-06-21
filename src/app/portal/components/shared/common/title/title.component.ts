import { Component, OnInit, Input  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})


export class TitleComponent implements OnInit {
  @Input() title: any;
  @Input() sampleCode: string;
  @Input() sectionCode: string;
  
  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    /* if (this.sampleCode !== null && this.sampleCode !== undefined) {
      let sampleCode = this.sampleCode;
      let sectionCode = this.sectionCode;

      if (sampleCode !== undefined || sectionCode !== undefined) {
        setTimeout(function(sampleCode, sectionCode){ 
          var container = document.getElementById(sampleCode); 
          var scrollTo = document.getElementById(sectionCode);
          
          if (container !== undefined && scrollTo !== null) {
            container.scrollTop = scrollTo.offsetTop - 80;
          }
        }, 500, sampleCode, sectionCode);
      }
    }   */
  } 

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}
