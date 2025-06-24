import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss']
})
export class ModalDetailsComponent implements OnInit {
  details: { label: string, value: string }[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.details = [
      { label: 'ID', value: data.id },
      { label: 'Asignado a', value: data.assignee },
      { label: 'Fecha creación', value: data.created },
      { label: 'Fecha de vencimiento', value: new Date(data.due).toLocaleString() },
      { label: 'ID de proceso de instancia', value: data.processInstanceId },
      { label: 'ID de proceso de definición', value: data.processDefinitionId },
      { label: 'Prioritario', value: data.projectPriority ? 'Yes' : 'No' },
      { label: 'Rol asignado', value: data.assigneeRoleDescription },
      { label: 'Tipo de trámite', value: data.typeRequest || 'N/A' },
      { label: 'ID de radicado', value: data.radicateId },
      { label: 'Fecha de expiración', value: data.expired },
      { label: 'Días para expirar', value: data.daysToExpire },
    ];
  }

  ngOnInit(): void {}

}
