import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sign-send-button',
  templateUrl: './sign-send-button.component.html',
  styleUrls: ['./sign-send-button.component.scss']
})
export class SignSendButtonComponent implements OnInit {

  @Input() text : string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
