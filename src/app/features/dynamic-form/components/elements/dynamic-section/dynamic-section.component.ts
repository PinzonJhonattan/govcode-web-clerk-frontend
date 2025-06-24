import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  DynamicElementBaseComponent
} from "@features/dynamic-form/components/base/dynamic-element-base/dynamic-element-base.component";
import {formTypes} from "@features/dynamic-form/constants/formTypes";
import {groupFormByRow} from "@features/dynamic-form/utils/groupFieldsByRow";
import {ComponentForm} from "@features/dynamic-form/models/formStructure.model";
import {FormArray, FormBuilder} from "@angular/forms";
import {groupFieldsBySection} from "@features/dynamic-form/utils/groupFieldsBySection";

const MAX_LEVEL_SUBSECTION = 3;

@Component({
  selector: 'app-dynamic-section',
  templateUrl: './dynamic-section.component.html',
  styleUrls: ['./dynamic-section.component.scss']
})
export class DynamicSectionComponent extends DynamicElementBaseComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('renderSectionTemplate', {static: false}) renderSectionTemplate: TemplateRef<any>;

  dynamicProps: any = {};
  prototypeFieldsSection: any[]
  sectionField: any = [];
  actualGroupFields: any;
  isReadonly = false;
  groupSection: any;

  constructor(private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {
    super()
  }

  override ngOnInit(): void {
    super.ngOnInit()

    this.dynamicProps.sections = [];

    const components = this.component?.properties?.components;

    this.groupSection = this.component?.properties?.groupSection;

    if (this.groupSection) {
      this.groupSection?.removeControl(this.component?.properties?.key);
      this.groupSection?.addControl(this.component?.properties?.key, new FormArray([]));
      this.sectionField = this.groupSection?.controls[this.component?.properties?.key]
    } else {
      this.groupSection = this.form;
      this.groupSection?.addControl(this.component?.properties?.key, new FormArray([]));
      this.sectionField = this.form.controls[this.component?.properties?.key]
    }

    let sectionComponents = JSON.parse(JSON.stringify(components))


    if (this.component?.properties?.level < MAX_LEVEL_SUBSECTION) {
      sectionComponents = groupFieldsBySection(sectionComponents, this.component?.properties?.level + 1);
    }
    this.prototypeFieldsSection = groupFormByRow(sectionComponents);

    try {
      this.isReadonly = JSON.parse(this.component?.properties?.readonly || false);
    } catch (error) {
      this.isReadonly = false;
    }

    if (this.isReadonly) {
      this.createReadonlyMode();
    } else {
      this.createWriteMode();
    }
  }

  ngAfterViewInit() {
    this.dynamicProps.template = this.renderSectionTemplate
  }

  addSection() {
    this.addGroupToSection();
    if (this.dynamicProps.sections.length < this.component?.properties?.limitSections) {
      let newSectionComponents = this.modifyParametersSection([...this.prototypeFieldsSection]);
      this.dynamicProps.sections = [...this.dynamicProps.sections, newSectionComponents]
    }
  }

  removeSection(index: number) {
    this.sectionField.removeAt(index);
    let copySections = [...this.dynamicProps.sections];
    let elementsToDelete = copySections.splice(index, 1)[0];
    this.dynamicProps.sections = [...copySections]

    if (copySections.length === 0) {
      this.addSection()
    }
  }

  modifyParametersSection(section, contextValuesForm = null) {
    let copySection = JSON.parse(JSON.stringify(section))
    let finalComponents = [];
    for (let components of copySection) {
      let row = [];
      for (let component of components) {
        let actualComponent: ComponentForm = component as ComponentForm;
        actualComponent.properties = actualComponent?.properties || {};
        if (this.isReadonly) {
          component.readonly = true
          component.properties.readonly = true;
        }
        actualComponent.properties.groupSection = this.actualGroupFields;
        if(actualComponent?.properties?.contextValues){
          actualComponent.properties.contextValues = {...this.component?.properties?.contextValues, ...contextValuesForm};
        }else{
          actualComponent.properties.contextValues = contextValuesForm
        }
        actualComponent.properties.externalScope = [...(this.component?.properties?.externalScope || []), this.groupSection];
        actualComponent.properties.parentsSection = [this.component?.properties?.key, ...(this.component?.properties?.parentsSection || [])];
        row.push(actualComponent);
      }
      finalComponents.push(row)
    }
    return finalComponents;
  }

  addGroupToSection() {
    this.actualGroupFields = this.formBuilder.group({});
    this.sectionField.push(this.actualGroupFields);
  }

  createWriteMode() {

    const sections = this.generateDynamicSections();

    this.dynamicProps = {
      sections: sections || [],
      template: this.renderSectionTemplate,
      addSection: this.addSection.bind(this),
      removeSection: this.removeSection.bind(this),
      limitSections: this.component?.properties?.limitSections,
      addButtonText: this.component?.properties?.addButtonText,
      removeButtonText: this.component?.properties?.removeButtonText,
      titleSection: this.component?.properties?.titleSection,
      levelSection: this.component?.properties?.level,
      name: this.component?.properties?.key
    }
  }

  createReadonlyMode() {

    const sections = this.generateDynamicSections();

    this.dynamicProps = {
      sections: sections || [],
      template: this.renderSectionTemplate,
      titleSection: this.component?.properties?.titleSection,
      levelSection: this.component?.properties?.level,
      readonly: true,
      name: this.name
    }
  }

  generateDynamicSections() {
    let sections = [];
    let values;
    if (this.component?.properties?.level === 1 && this.valuesForm[this.component?.properties?.key]) {
      values = JSON.parse(this.valuesForm[this.component?.properties?.key].value)
    } else if (this.component?.properties?.contextValues) {
      values = this.component?.properties?.contextValues[this.component?.properties?.key];
    } else {
      this.actualGroupFields = this.formBuilder.group({});
      this.sectionField.push(this.actualGroupFields);
      let newSectionComponents = this.modifyParametersSection(this.prototypeFieldsSection);
      sections = [...this.dynamicProps.sections, newSectionComponents]
      return sections;
    }
    values.forEach((section, index) => {
      this.actualGroupFields = this.formBuilder.group({...section});
      this.sectionField.push(this.actualGroupFields);
      let newSectionComponents = this.modifyParametersSection(this.prototypeFieldsSection, {...section});
      sections.push(newSectionComponents);
    })
    return sections;
  }
  ngOnDestroy() {
    if (!this.component?.properties?.groupSection) {
      this.form.removeControl(this.component?.key || this.component?.properties?.key)
    }
  }
  protected readonly formTypes = formTypes;
}
