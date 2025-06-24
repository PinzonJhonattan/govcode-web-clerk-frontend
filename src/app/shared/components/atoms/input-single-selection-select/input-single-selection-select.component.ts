import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-single-selection-select',
  templateUrl: './input-single-selection-select.component.html',
  styleUrls: ['./input-single-selection-select.component.scss']
})
export class InputSingleSelectionSelectComponent implements OnInit {

  @Input() fieldControl !: FormControl;
  @Input() placeholder: string = "";
  @Input() label : string = "";
  @Input() name : string = "";
  @Input() options : any[] = []
  @Input() readonly : boolean = false;
  @Input() sendLabels : boolean = false;
  @Input() isSearchable : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
