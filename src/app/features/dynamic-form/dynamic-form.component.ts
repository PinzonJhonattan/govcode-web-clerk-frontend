import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormDirective } from "@features/dynamic-form/directives/form.directive";
import { ComponentForm } from "@features/dynamic-form/models/formStructure.model";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { groupFormByRow } from "@features/dynamic-form/utils/groupFieldsByRow";
import { DynamicForm } from "@features/dynamic-form/models/dynamicForm.model";
import { formTypes } from "@features/dynamic-form/constants/formTypes";
import { transformFieldsToCamundaFormat } from "@features/dynamic-form/utils/transformFieldsToCamundaFormat";
import { separateLinealFields } from "@features/dynamic-form/utils/separateLinealFields";
import { LinealInTabFormDirective } from "@features/dynamic-form/directives/linealInTabForm.directive";

import { DeviceDetectorService } from "ngx-device-detector";
import { orderBySameGroup } from "@features/dynamic-form/utils/orderBySameGroup";
import { FormService } from "@features/dynamic-form/services/form.service";
import { groupTableComponents } from "@features/dynamic-form/utils/groupTableComponents";
import { groupFieldsBySection } from "@features/dynamic-form/utils/groupFieldsBySection";
import { GeneralInfoService } from "@features/dynamic-form/services/general-info.service";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})

export class DynamicFormComponent implements OnInit, OnChanges {
  @ViewChild(FormDirective, { static: true }) formHost!: FormDirective;
  @ViewChild(LinealInTabFormDirective, { static: true }) linealTabForm!: LinealInTabFormDirective;

  @Input() dataComponents: any = null;
  @Input() uiTypeForms: any = null;
  @Input() uiComponents: any = null;
  @Input() typeForm = 'lineal';
  @Input() valuesForm: any = {};
  @Input() resetOnSend: boolean = true;
  @Input() actions: any = {}
  @Input() defaultAction: string = ''
  @Input() originServer = '';
  @Input() messageErrorForm = '';

  status = "init";
  formTypes = formTypes;
  rowsFormComponents: any
  rowslinealFormComponents: any = null;
  messageError: string = '';
  submitRow: ComponentForm[] = []
  isMobile: boolean = false;
  allComponents = [];
  form: FormGroup;

  messageErrorNoDocumentRelated: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private deviceService: DeviceDetectorService,
    private generalInfoForm: GeneralInfoService
  ) {

    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {
    this.generalInfoForm.updateInfoForm({
      originServer: this.originServer
    })
    this.loadFieldsForm()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.valuesForm) {
      this.loadDynamicForm()
    }
  }

  loadFieldsForm() {
    if (!this.dataComponents) return;
    let components: any[] = [...this.dataComponents];

    components = orderBySameGroup(components);
    components = groupTableComponents(components);
    components = groupFieldsBySection(components, 1);
    this.dataComponents = components;

    const hasRelatedToDocument = components.some(component =>
      component.properties && component?.properties?.relatedToDocument
    );

    if (hasRelatedToDocument) {
      components.forEach(component => {
        if (component.properties && component?.properties?.relatedToDocument) {
          const relatedDocument = component?.properties?.relatedToDocument;
          const relatedComponent = components?.find(c => c.key && c.key?.includes(relatedDocument));
          const relatedComponentKey = relatedComponent?.key;

          let partes = relatedComponentKey.split('-');
          partes.pop();

          // let relatedComponentKeyModificada = partes.join('-');

          // const sonIguales = relatedDocument === relatedComponentKeyModificada;

          // if (!sonIguales) {
          //     this.messageErrorNoDocumentRelated = No se encontró componente relacionado para '${relatedDocument}';
          // }
        }
      });
    }

    if (this.typeForm !== 'lineal') {
      const [linealFields, noLinealFields] = separateLinealFields(components);
      this.rowslinealFormComponents = groupFormByRow(linealFields);
      this.rowsFormComponents = groupFormByRow(noLinealFields);
    }else{
      this.rowsFormComponents = groupFormByRow(components)
    }

    this.allComponents = components;
    this.loadDynamicForm();
  }

  loadDynamicForm() {

    const newForm = this.formBuilder.group({})
    this.formService.setDynamicForm(newForm);
    this.form = this.formService.getDynamicForm()

    if (this.typeForm !== 'lineal') {
      const viewLinearTabFormRef = this.linealTabForm.viewContainerRef;
      viewLinearTabFormRef.clear();
      const linearTabFormComponent = viewLinearTabFormRef.createComponent<DynamicForm>(this.formTypes['lineal'])
      linearTabFormComponent.instance.fieldsForm = this.rowslinealFormComponents
      linearTabFormComponent.instance.form = this.form
      linearTabFormComponent.instance.valuesForm = this.valuesForm
      linearTabFormComponent.instance.uiForm = {
        uiTypeForms: this.uiTypeForms,
        uiComponents: this.uiComponents
      };
    }

    const viewFormContainerRef = this.formHost.viewContainerRef;
    viewFormContainerRef.clear();
    const formComponent = viewFormContainerRef.createComponent<DynamicForm>(this.formTypes[this.typeForm || 'lineal'])
    formComponent.instance.fieldsForm = this.rowsFormComponents
    formComponent.instance.form = this.form
    formComponent.instance.valuesForm = this.valuesForm
    formComponent.instance.uiForm = {
      uiTypeForms: this.uiTypeForms,
      uiComponents: this.uiComponents
    };
  }

  isValidForm() {
    this.formService.triggerFormSubmit();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status = 'error';
      this.messageError = 'Formulario invalido, Complete todos los campos marcados en rojo correctamente';
      return false
    }
    return true
  }

  resetForm() {
    this.loadDynamicForm()
    this.formService.triggerFormReset();
  }

  completeForm(event: any) {
    this.status = 'loading';

    const variablesForm = transformFieldsToCamundaFormat(this.dataComponents, this.form);

    let action = event?.submitter?.parentElement?.parentElement?.getAttribute('data-action') || '';
    let actionIdentifier = event?.submitter?.parentElement?.parentElement?.getAttribute('data-action-identifier') || '';

    let finalAction = action + actionIdentifier;

    let componentAction = this.dataComponents.find(element => ((element?.properties?.action || '') + (element?.properties?.actionIdentifier || '') === finalAction))

    if (!componentAction) {
      componentAction = this.dataComponents.find(element => element?.properties?.action == null)
    }
    if (!action) {
      action = this.defaultAction
    }

    const triggerAction = this.actions[action] || this.actions[this.defaultAction]

    triggerAction({
      form: this.form,
      variables: variablesForm,
      isValidForm: this.isValidForm.bind(this),
      resetForm: this.resetForm.bind(this),
      component: componentAction
    })
  }
}
