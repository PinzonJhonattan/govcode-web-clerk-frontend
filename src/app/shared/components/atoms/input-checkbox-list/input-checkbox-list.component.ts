import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {getErrorMessage} from "@shared/utils/getErrorMessage";

@Component({
  selector: 'app-input-checkbox-list',
  templateUrl: './input-checkbox-list.component.html',
  styleUrls: ['./input-checkbox-list.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class InputCheckboxListComponent implements OnInit,OnChanges{

  @Input() fieldControl !: FormControl;
  @Input() description: string = "";
  @Input() label : string = "";
  @Input() name : string = "";
  @Input() options : any[] = [];
  @Input() readonly : boolean = false;
  @Input() sendLabels : boolean = false;
  @Input() numColumns : number = 1;

  selectedValues = [];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      const selectedOptionsArray = this.fieldControl?.value;

      if (typeof selectedOptionsArray === 'string') {
        this.selectedValues = selectedOptionsArray.split(',').map(value => this.mapValue(value));
        this.fieldControl.setValue(this.selectedValues.join(','))
      } else if (Array.isArray(selectedOptionsArray)) {
        this.selectedValues = selectedOptionsArray.map(value => this.mapValue(value));
        this.fieldControl.setValue(this.selectedValues.join(','))
      } else {
        this.selectedValues = null;
        this.fieldControl.setValue(null)
      }
    }
  }
  mapValue(value: string): string {
    const option = this.options.find(option => option.value === value);
    return option ? (this.sendLabels ? option.label : value) : value;
  }

  onGroupsChange(selectedValues: string[]) {
    this.fieldControl.setValue(selectedValues.join(','))
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
