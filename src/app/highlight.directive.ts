import { Directive, ElementRef  } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundImage = 'https://zaggolenews.files.wordpress.com/2017/12/social-media-1806995_1280.png?w=918';
 }

}
