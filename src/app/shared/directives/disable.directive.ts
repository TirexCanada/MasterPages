import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

const DISABLED = 'disabled';
const APP_DISABLED = 'app-disabled';
const TAB_INDEX = 'tabindex';
const TAG_ANCHOR = 'a';

@Directive({
  selector: '[appDisable]',
  standalone: true
})
export class DisableDirective implements OnChanges, OnInit, AfterViewInit {

  @Input() appDisable = true;

  constructor(private eleRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.disableElement(this.eleRef.nativeElement);
  }

  ngOnChanges() {
    this.disableElement(this.eleRef.nativeElement);
  }

  ngAfterViewInit() {
    this.disableElement(this.eleRef.nativeElement);
  }

  private disableElement(element: any) {
    if (this.appDisable) {
      if (!element.hasAttribute(DISABLED)) {
        this.renderer.setAttribute(element, APP_DISABLED, '');
        this.renderer.setAttribute(element, DISABLED, 'true');

        // disabling anchor tab keyboard event
        if (element.tagName.toLowerCase() === TAG_ANCHOR) {
          this.renderer.setAttribute(element, TAB_INDEX, '-1');
        }
      }
    } else {
      if (element.hasAttribute(APP_DISABLED)) {
        if (element.getAttribute('disabled') !== '') {
          element.removeAttribute(DISABLED);
        }
        element.removeAttribute(APP_DISABLED);
        if (element.tagName.toLowerCase() === TAG_ANCHOR) {
          element.removeAttribute(TAB_INDEX);
        }
      }
    }
    if (element.children) {
      for (let ele of element.children) {
        this.disableElement(ele);
      }
    }
  }
}