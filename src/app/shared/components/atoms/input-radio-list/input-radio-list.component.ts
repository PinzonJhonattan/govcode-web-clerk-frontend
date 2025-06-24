import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {getErrorMessage} from "@shared/utils/getErrorMessage";

@Component({
  selector: 'app-input-radio-list',
  templateUrl: './input-radio-list.component.html',
  styleUrls: ['./input-radio-list.component.scss']
})
export class InputRadioListComponent implements OnInit,OnChanges {

  @Input() fieldControl !: FormControl;
  @Input() description: string = "";
  @Input() label : string = "";
  @Input() name : string = "";
  @Input() options : any[] = [];
  @Input() sendLabels : boolean = false;
  @Input() readonly : boolean = false;
  @Input() numColumns : number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      const selectedValue = this.options.find(option => option.value === this.fieldControl.value) || null
      if(!selectedValue){
        this.fieldControl.setValue(null);
      }else{
        this.fieldControl.setValue(selectedValue && this.sendLabels ? selectedValue?.label  : selectedValue?.value)
      }
    }
  }
  get chooseNumColumns() {
    const columns: { [key: number]: string } = {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
      5: 'md:grid-cols-5',
      6: 'md:grid-cols-6',
      7: 'md:grid-cols-7',
      8: 'md:grid-cols-8',
      9: 'md:grid-cols-9',
      10: 'md:grid-cols-10',
    }
    const resultNumColumns = columns[this.numColumns];
    return resultNumColumns ? resultNumColumns : 'md:grid-cols-1';
  }

  protected readonly getErrorMessage = getErrorMessage;
  protected readonly Validators = Validators;
}
