import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from "@angular/forms";
import { ProcedureType } from '@core/models/lists';
import { ProcedureTypesService } from '@core/services/procedure-types.service';
import { columnProcedureTypes } from '@features/admin-basic-data/constants/columns-procedure-types';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-of-procedure-types',
  templateUrl: './list-of-procedure-types.component.html',
  styleUrls: ['./list-of-procedure-types.component.scss']
})
export class ListOfProcedureTypesComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.state = 'loading';
    this.procedureTypesService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((process: ProcedureType) => {
            return {
              ...process,
              linkButtonEdit: `edit/${process.id}`,
              linkButtonReview: `review/${process.id}`,
              linkButtonDelete: `delete/${process.id}`,
            }
          })
          this.dataTableProcedures = data;
        }
      })
  }

  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnProcedureTypes;
  dataTableProcedures: any[] = [];
  state: string = 'idle';

  constructor(private procedureTypesService: ProcedureTypesService) { }

  ngOnInit(): void {
    this.procedureTypesService.get()
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
          this.dataTableProcedures = data;
        }}
      );
  }

  handleDeleteEvent(field: any): void {
    Swal.fire({
      title: `Seguro que quieres eliminar el siguiente tipo de Trámite?`,
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
        this.procedureTypesService.delete(field.id)
          .pipe(
            switchMap(() => this.procedureTypesService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((procedureType: ProcedureType) => {
                return {
                  ...procedureType,
                  linkButtonEdit: `edit/${procedureType.id}`,
                  linkButtonReview: `review/${procedureType.id}`,
                  linkButtonDelete: `delete/${procedureType.id}`,
                }
              })
              this.dataTableProcedures = data;
              Swal.fire({
                position: 'bottom-end',
                html: '<p>Tipo de Trámite eliminado</p>',
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
