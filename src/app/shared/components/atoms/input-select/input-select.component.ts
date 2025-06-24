import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import {getErrorMessage} from "@shared/utils/getErrorMessage";

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit,OnChanges {

  @Input() fieldControl !: FormControl;
  @Input() placeholder: string = "";
  @Input() label : string = "";
  @Input() name : string = "";
  @Input() options : any[] = [];
  @Input() readonly : boolean = false;
  @Input() sendLabels : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      const selectedValue = this.options.find(option => option.value === this.fieldControl.value || option.label === this.fieldControl.value) || null
      if(!selectedValue){
        this.fieldControl.setValue(null);
      }else{
        this.fieldControl.setValue(selectedValue && this.sendLabels ? selectedValue?.label  : selectedValue?.value)
      }
    }
  }

  protected readonly getErrorMessage = getErrorMessage;
}
