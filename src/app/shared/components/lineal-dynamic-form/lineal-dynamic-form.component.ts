import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-lineal-dynamic-form',
  templateUrl: './lineal-dynamic-form.component.html',
  styleUrls: ['./lineal-dynamic-form.component.scss']
})
export class LinealDynamicFormComponent implements OnInit {

  @Input() template: TemplateRef<any>;
  @Input() components : any
  isMobile = false;

  constructor(private deviceService: DeviceDetectorService, ) {
    this.isMobile = this.deviceService.isMobile();
  }
  ngOnInit(): void {
  }
}
