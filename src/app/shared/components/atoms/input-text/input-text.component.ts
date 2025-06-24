import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {getErrorMessage} from "@shared/utils/getErrorMessage";

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

  @Input() fieldControl !: FormControl;
  @Input() type: string = 'text';
  @Input() placeholder: string = "";
  @Input() label : string = "";
  @Input() name : string = "";
  @Input() readonly : boolean = false;
  @Input() prefix : string = '';
  @Input() suffix : string = '';
  @Input() mask : string = null;
  @Input() keepMask : boolean = false;
  @Input() thousandSeparator : string = ''
  @Input() decimalDigits : number = 0;
  @Input() decimalMarker : string = '';

  constructor() { }

  ngOnInit(): void {
  }

  get inputMask() {
    switch (this.type) {
      case 'digit':
        if (!this.thousandSeparator) return '0*';
        else return `separator.${this.decimalDigits}`;
      case 'currency':
        this.prefix = this.prefix || '$';
        this.thousandSeparator = this.thousandSeparator || ',';
        this.decimalMarker = this.decimalMarker || '.';
        return `separator.${this.decimalDigits}`;
      default:
        return this.mask || '';
    }
  }
  protected readonly getErrorMessage = getErrorMessage;
}
