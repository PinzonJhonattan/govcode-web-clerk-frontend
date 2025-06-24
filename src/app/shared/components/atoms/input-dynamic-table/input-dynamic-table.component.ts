import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-input-dynamic-table',
  templateUrl: './input-dynamic-table.component.html',
  styleUrls: ['./input-dynamic-table.component.scss']
})
export class InputDynamicTableComponent implements OnInit {

  @Input() text : string = '';
  @Input() data : any = [];
  @Input() template : TemplateRef<any>;
  @Input() columns : any[];
  @Input() nameIndexColumn : string = ''
  @Input() removeRegisterAction : (index : number) => {};
  @Input() addRegisterAction : () => {};
  @Input() resultTitle : string = ''
  @Input() resultComponent : any = null
  @Input() limitRows : number;

  displayedColumns = [];
  constructor() { }

  ngOnInit(): void {
    if(this.nameIndexColumn){
      this.displayedColumns = [this.nameIndexColumn, ...this.columns, 'action']
    }else{
      this.displayedColumns = [...this.columns, 'action']
    }
  }
}
