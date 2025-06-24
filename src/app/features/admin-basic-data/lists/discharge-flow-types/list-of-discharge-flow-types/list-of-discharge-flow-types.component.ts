import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from "@angular/forms";
import { DischargeFlowTypes } from '@core/models/lists';
import { DischargeFlowTypesService } from '@core/services/discharge-flow-types.service';
import { columnDischargeFlowTypes } from '@features/admin-basic-data/constants/columns-discharge-flow-types';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-list-of-discharge-flow-types',
  templateUrl: './list-of-discharge-flow-types.component.html',
  styleUrls: ['./list-of-discharge-flow-types.component.scss']
})
export class ListOfDischargeFlowTypesComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.state = 'loading';
    this.dischargeFlowTypesService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((process: DischargeFlowTypes) => {
            return {
              ...process,
              linkButtonEdit: `edit/${process.id}`,
              linkButtonReview: `review/${process.id}`,
              linkButtonDelete: `delete/${process.id}`,
            }
          })
          this.dataTableDischargeFlowTypes = data;
        }
      })
  }


  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnDischargeFlowTypes;
  dataTableDischargeFlowTypes: any[] = [];
  state: string = 'idle';

  constructor(private dischargeFlowTypesService: DischargeFlowTypesService) { }

  ngOnInit(): void {
    this.state = 'loading';
    this.dischargeFlowTypesService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((process: any) => {
            return {
              ...process,
              linkButtonEdit: `edit/${process.id}`,
              linkButtonReview: `review/${process.id}`,
              linkButtonDelete: `delete/${process.id}`,
            }
          })
          this.dataTableDischargeFlowTypes = data;
        }
      });
  }

  handleDeleteEvent(field: any): void {
    Swal.fire({
      title: `Seguro que quieres eliminar el siguiente tipo de flujo de descarga?`,
      html: `Nombre: <b>${field.name}</b>`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f44336',
      cancelButtonColor: '',
      // buttonsStyling: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.state = 'loading';
        this.dischargeFlowTypesService.delete(field.id)
          .pipe(
            switchMap(() => this.dischargeFlowTypesService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((procedureType: DischargeFlowTypes) => {
                return {
                  ...procedureType,
                  linkButtonEdit: `edit/${procedureType.id}`,
                  linkButtonReview: `review/${procedureType.id}`,
                  linkButtonDelete: `delete/${procedureType.id}`,
                }
              })
              this.dataTableDischargeFlowTypes = data;
              Swal.fire({
                position: 'bottom-end',
                html: '<p>Tipo de flujo de descarga eliminado</p>',
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
              })
            }
          })
      }
    })
  }

}
