import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss']
})
export class InputCheckboxComponent implements OnInit {

  @Input() fieldControl !: FormControl;
  @Input() label : string = "";
  @Input() name : string = "";
  @Input() description : string = '';
  @Input() readonly : boolean = false;
  constructor() { }
  ngOnInit(): void {
  }

}
