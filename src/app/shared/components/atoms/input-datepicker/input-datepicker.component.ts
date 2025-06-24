import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {getErrorMessage} from "@shared/utils/getErrorMessage";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/es';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class InputDatepickerComponent implements OnInit {

  @Input() fieldControl !: FormControl;
  @Input() placeholder: string = "";
  @Input() label : string = "";
  @Input() name : string = "";
  @Input() readonly : boolean = false;
  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private datePipe : DatePipe
  ) {}

  ngOnInit(): void {
    this._locale = 'es';
    this._adapter.setLocale(this._locale);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.fieldControl.setValue(this.datePipe.transform(event.value,'YYYY-MM-dd'))

  }
  protected readonly getErrorMessage = getErrorMessage;
}
