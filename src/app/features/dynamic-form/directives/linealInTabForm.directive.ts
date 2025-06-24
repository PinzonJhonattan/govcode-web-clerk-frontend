import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appLinearInTabForm]'
})
export class LinealInTabFormDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }

}
