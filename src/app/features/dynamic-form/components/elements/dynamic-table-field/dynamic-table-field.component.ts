import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  GenericFormComponentComponent
} from "@features/dynamic-form/components/base/generic-form-component/generic-form-component.component";
import {
  DynamicElementBaseComponent
} from "@features/dynamic-form/components/base/dynamic-element-base/dynamic-element-base.component";

@Component({
  selector: 'app-dynamic-table-field',
  templateUrl: './dynamic-table-field.component.html',
  styleUrls: ['./dynamic-table-field.component.scss']
})
export class DynamicTableFieldComponent extends DynamicElementBaseComponent implements OnInit, AfterViewInit {

  @ViewChild('renderComponentTemplate', {static: true}) renderComponentTemplate: TemplateRef<any>;

  dynamicProps: any
  constructor() {
    super()
  }

  prototypeRow: any = {}

  override ngOnInit(): void {
    super.ngOnInit();
    this.prototypeRow = this.component.properties?.rows;

    const lastColumnKey = this.prototypeRow[this.prototypeRow.length - 1]?.key
    const columns = this.component?.properties?.columns.map(column => column.trim())

    const initialRowTable = this.createInitialRow();

    const resultTableComponent = this.component.properties?.resultComponent
    const resultComponent =  {
      ...resultTableComponent,
      properties : {
        ...resultTableComponent.properties,
        lastColumnResult : lastColumnKey,
        tableIdentity : this.component.properties?.key
      }
    }

      this.dynamicProps = {
      text: this.component.text,
      columns,
      data: [initialRowTable],
      nameIndexColumn : this.component.properties?.nameIndexColumn.trim(),
      resultComponent  : resultComponent,
      resultTitle : resultComponent.properties?.title,
      removeRegisterAction : this.removeRegister.bind(this),
      addRegisterAction : this.addRegister.bind(this),
      limitRows  : this.component?.properties?.limitRows
    }
  }

  ngAfterViewInit() {
    this.dynamicProps.template = this.renderComponentTemplate;
  }

  addRegister() {
    if(this.dynamicProps.data.length >= this.component?.properties?.limitRows){
      return
    }else{
      const newRow = this.createPrototypeNRow();
      this.dynamicProps.data = [
        ...this.dynamicProps.data, newRow
      ]
    }
  }
  removeRegister(index: number) {
    const copyData = [...this.dynamicProps.data];
    let elementsToDelete = copyData.splice(index, 1)[0]
    Object.keys(elementsToDelete).forEach(element => {
      this.form.removeControl(elementsToDelete[element].key)
    })
    this.dynamicProps.data = [...copyData]
    if(copyData.length === 0){
      this.addRegister();
    }
  }
  changeEquationVariables(nameFieldsInColumns, nameFieldsInColumnsByRow, equation){
    const regex = new RegExp(nameFieldsInColumns.join('|'), 'g');
    return equation.replace(regex, (match) => {
      const indice = nameFieldsInColumns.indexOf(match);
      return nameFieldsInColumnsByRow[indice];
    });
  }

  createInitialRow(){
    return this.createPrototypeNRow();
  }
  createPrototypeNRow(){
    let nameFieldsInColumns = this.prototypeRow.map(column => column?.key);

    let nameFieldsInColumnsByRow = nameFieldsInColumns.map(column => `${column}_${this.component.properties?.key}_${Date.now()}`);

    return this.prototypeRow?.reduce((row, column, index) => {
      let nameColumnKey = `${column?.key}_${this.component.properties?.key}_${Date.now()}`;
      let nameColumn = this.component.properties?.columns[index];
      row[nameColumn] = {...column, key: nameColumnKey}
      if(column?.properties?.type === 'resultCalc'){
        row[nameColumn] = {
          ...row[nameColumn],
          properties : {
            ...row[nameColumn]?.properties,
            equation : this.changeEquationVariables(nameFieldsInColumns, nameFieldsInColumnsByRow, column?.properties?.equation)
          }
        }
      }
      return row;
    }, {})
  }

  protected readonly GenericFormComponentComponent = GenericFormComponentComponent;
}
