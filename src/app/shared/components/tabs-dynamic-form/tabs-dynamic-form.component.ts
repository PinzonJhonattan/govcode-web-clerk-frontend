import {
  Component,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-tabs-dynamic-form',
  templateUrl: './tabs-dynamic-form.component.html',
  styleUrls: ['./tabs-dynamic-form.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class TabsDynamicFormComponent implements OnInit {

  @Input() template: TemplateRef<any>;
  @Input() tabsInfo : any
  @Input() tabsComponents : any
  @Input() tabsWithErrors : any
  isMobile = false;

  constructor(private deviceService: DeviceDetectorService, ) {
    this.isMobile = this.deviceService.isMobile();
  }
  ngOnInit(): void {
  }

  protected readonly Object = Object;
}
