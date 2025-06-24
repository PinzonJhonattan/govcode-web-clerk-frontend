import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {getErrorMessage} from "@shared/utils/getErrorMessage";

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent implements OnInit {

  @Input() fieldControl !: FormControl;
  @Input() placeholder: string = "";
  @Input() label : string = "";
  @Input() name : string = "";
  @Input() readonly : boolean = false;
  @Input() rows : number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  protected readonly getErrorMessage = getErrorMessage;
}
