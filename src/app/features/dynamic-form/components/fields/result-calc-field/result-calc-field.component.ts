import {Component, OnInit} from '@angular/core';
import {
  DynamicFieldBaseComponentComponent
} from "@features/dynamic-form/components/base/dynamic-field-base-component/dynamic-field-base-component.component";

@Component({
  selector: 'app-result-calc-field',
  templateUrl: './result-calc-field.component.html',
  styleUrls: ['./result-calc-field.component.scss']
})
export class ResultCalcFieldComponent extends DynamicFieldBaseComponentComponent implements OnInit {

  dynamicProps: any;
  regexOperators : RegExp = /\b[a-zA-ZñÑ_][a-zA-ZñÑ_\d]*\b/gu;

  constructor() {
    super()
  }

  override ngOnInit() {
    super.ngOnInit();
    this.dynamicProps = {
      fieldControl : this.fieldControl,
      type: 'text',
      label: this.component.label,
      placeholder: this.component.description,
      name : this.name,
      readonly: true
    }
    if (this.component.properties?.equation){
      const matchesVariables : string[] = [...new Set(this.component.properties?.equation.match(this.regexOperators))] as string[];
      for (let match of matchesVariables){
        this.form.controls[match]?.valueChanges.subscribe(data => {
          this.evaluateEquation({...this.valuesForm, ...this.form.value, [match] : data })
        })
      }
    }
  }
  evaluateEquation(data) {
    try {
      const removeBlankSpaces = (this.component.properties?.equation as string).replace(/\s*/g, "");

      const resultExpression = removeBlankSpaces.replace(this.regexOperators, (match) => {
        return data[match]
      });

      const evalExpression = eval(resultExpression);
      this.form.controls[this.component.key].setValue(evalExpression)
    }
    catch (error){
      this.form.controls[this.component.key].setValue(0)
    }
  }
}
