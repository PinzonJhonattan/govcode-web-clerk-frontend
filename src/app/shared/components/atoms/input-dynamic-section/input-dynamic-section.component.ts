import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-input-dynamic-section',
  templateUrl: './input-dynamic-section.component.html',
  styleUrls: ['./input-dynamic-section.component.scss']
})
export class InputDynamicSectionComponent implements OnInit {

  @Input() template : TemplateRef<any>;
  @Input() sections : any[]
  @Input() limitSections : number;
  @Input() addSection  : () => {}
  @Input() removeSection  : (index : number) => {}
  @Input() addButtonText : string = '';
  @Input() removeButtonText : string = '';
  @Input() titleSection : string = ''
  @Input() readonly  : boolean = false;
  @Input() levelSection: number = 1;
  @Input() name: string = '';
  constructor() { }

  ngOnInit(): void {
  }
}
