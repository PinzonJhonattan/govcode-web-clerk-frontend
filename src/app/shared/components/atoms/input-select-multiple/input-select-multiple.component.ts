import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import {getErrorMessage} from "@shared/utils/getErrorMessage";

@Component({
  selector: 'app-input-select-multiple',
  templateUrl: './input-select-multiple.component.html',
  styleUrls: ['./input-select-multiple.component.scss']
})
export class InputSelectMultipleComponent implements OnInit,OnChanges {

  @Input() fieldControl !: FormControl;
  @Input() placeholder: string = "";
  @Input() label : string = "";
  @Input() name : string = "";
  @Input() options : any[] = [];
  @Input() sendLabels : boolean = false;
  @Input() readonly : boolean = false;

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
        this.fieldControl.setValue(null);
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

  protected readonly getErrorMessage = getErrorMessage;
}
