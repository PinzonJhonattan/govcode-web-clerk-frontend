import {Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {getErrorMessage} from "@shared/utils/getErrorMessage";

@Component({
  selector: 'app-input-select-search',
  templateUrl: './input-select-search.component.html',
  styleUrls: ['./input-select-search.component.scss']
})
export class InputSelectSearchComponent implements OnInit, OnDestroy {

  @Input() fieldControl !: FormControl;
  @Input() placeholder: string = "";
  @Input() label : string = "";
  @Input() name : string = "";
  @Input() options : any[] = []
  @Input() readonly : boolean = false;
  @Input() sendLabels : boolean = false;

  /** filter control to serch field **/
  public filterControl: FormControl<string> = new FormControl<string>('');

  /** list of banks filtered by search keyword */
  public filteredOptions: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor() { }

  ngOnInit() {

    this.filteredOptions.next(this.options.slice());

    // listen for search field value changes
    this.filterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterOptions();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.filteredOptions.next(this.options.slice());
      const selectedValue = this.options.find(option => option.value === this.fieldControl.value || option.label === this.fieldControl.value) || null
      if(!selectedValue){
        this.fieldControl.setValue(null);
      }else{
        this.fieldControl.setValue(selectedValue && this.sendLabels ? selectedValue?.label  : selectedValue?.value)
      }
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected filterOptions() {
    if (!this.options) {
      return;
    }
    // get the search keyword
    let search = this.filterControl.value;
    if (!search) {
      this.filteredOptions.next(this.options.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredOptions.next(
      this.options.filter(option => option.label.toLowerCase().indexOf(search) > -1)
    );
  }

  protected readonly getErrorMessage = getErrorMessage;
}
