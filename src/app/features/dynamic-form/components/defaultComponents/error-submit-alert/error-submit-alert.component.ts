import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error-submit-alert',
  templateUrl: './error-submit-alert.component.html',
  styleUrls: ['./error-submit-alert.component.scss']
})
export class ErrorSubmitAlertComponent implements OnInit {

  @Input() messageError : string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
