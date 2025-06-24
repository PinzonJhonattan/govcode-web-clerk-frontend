import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {getErrorMessage} from "@shared/utils/getErrorMessage";

@Component({
  selector: 'app-input-datetimepicker',
  templateUrl: './input-datetimepicker.component.html',
  styleUrls: ['./input-datetimepicker.component.scss']
})
export class InputDatetimepickerComponent implements OnInit {

  @Input() fieldControl !: FormControl;
  @Input() placeholder: string = "";
  @Input() label : string = "";
  @Input() name : string = "";
  @Input() readonly : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  protected readonly getErrorMessage = getErrorMessage;
}
