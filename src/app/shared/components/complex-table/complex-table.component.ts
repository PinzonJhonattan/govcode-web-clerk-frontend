import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { Observable, of, ReplaySubject } from "rxjs";
import { filter } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";

import { SelectionModel } from "@angular/cdk/collections";
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { stagger40ms } from "../../../../@vex/animations/stagger.animation";
import { UntypedFormControl } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Color, resultProcedure } from "@features/dynamic-report/models/dynamic-reports.model";
import {UserService} from "@core/services/user.service";

@UntilDestroy()
@Component({
  selector: "app-complex-table",
  templateUrl: "./complex-table.component.html",
  styleUrls: ["./complex-table.component.scss"],
  animations: [fadeInUp400ms, stagger40ms],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "standard",
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class ComplexTableComponent implements OnInit, AfterViewInit {
  layoutCtrl = new UntypedFormControl("fullwidth");

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  objects: any[];
  dataTable: any[] = [];
  columnsTable : TableColumn<any>[] = [];
  @Input() sourcePermissions?: any[] = this.userService.getUser()?.roles?.map(permission => permission?.name) || []
  @Input() nameTable: string = "";
  @Input() actionsButton: Record<string, (...args: any[]) => any> = null;
  @Input()
  set columns(value: TableColumn<any>[]) {
    this.columnsTable = value?.filter(column => (column.permissions || []).every(permission => this.sourcePermissions.includes(permission)))
  }
  @Input()
  set dataSourceTable(data) {
    this.dataTable = data;
    this.setData();
  }
  @Input() openEditModal: (data) => void
  @Input() handleRemoveElements : () => void;
  @Input() titleEditModal: string = '';
  @Input() hasReloadDataButton : boolean = false;
  @Input() messageReloadButton : string = '';
  @Input() stateData: string = '';
  @Input() messageNotFound: string = '';
  @Input() backgroundColorTab: Color;
  @Input() actionsAlignment: "start" | "center" | "end" = "center";

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;
  selection = new SelectionModel<any>(true, []);
  searchCtrl = new UntypedFormControl();


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Output() deleteEvent = new EventEmitter<number>();
  @Output() resetPasswordEvent = new EventEmitter<number>();
  @Output() reloadDataEvent: EventEmitter<string> = new EventEmitter();
  @Output() rowsSelectedChangeEvent: EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog, private userService : UserService) { }

  get visibleColumns() {
    return this.columnsTable
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * get data and pass it to the table
   */
  getData() {
    return of(this.dataTable.map((object) => new Object(object)));
  }

  setData() {
    this.getData().subscribe((objects) => {
      this.subject$.next(objects);
    });
    this.selection.clear();
  }

  activeReloadDataEvent(){
    this.selection.clear();
    this.rowsSelectedChangeEvent.emit(this.selection.selected);
    this.reloadDataEvent.emit();

  }

  ngOnInit() {
    this.setData();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter<any[]>(Boolean)).subscribe((objects) => {
      this.objects = objects;
      this.dataSource.data = objects;
    });
    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));

    this.rowsSelectedChangeEvent.emit(this.selection.selected);
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  getLinkButton(row: any, property: string): string {
    switch (property) {
      case 'edit':
        return row.linkButtonEdit;
      case 'review':
        return row.linkButtonReview;
      case 'delete':
        return row.linkButtonDelete;
      default:
        return row.linkButton;
    }
  }

  handleButtonClick(row: any, property: string): void {
    if (property === 'delete') {
      this.deleteEvent.emit(row);
    } else if (property === 'resetPassword') {
      this.resetPasswordEvent.emit(row);
    }
  }

  getTitleButton(row : any, column : any){
    return typeof column.titleButton === 'function' ?  column.titleButton(row, column) : column.titleButton;
  }

  selectRow(row){
    this.selection.toggle(row)
    this.rowsSelectedChangeEvent.emit(this.selection.selected);
  }

}
