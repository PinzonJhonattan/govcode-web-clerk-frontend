import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core'

@Directive({ selector: '[clickoutside]' })

export class ClickOutsideDirective {

    constructor(private _elementRef: ElementRef) { }

    @Output('clickoutside') clickoutside: EventEmitter<any> = new EventEmitter();

    @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
        const clicked = this._elementRef.nativeElement.contains(targetElement);
        if (!clicked) {
            this.clickoutside.emit(true);
        } else {
            this.clickoutside.emit(false);
        }

    }

}