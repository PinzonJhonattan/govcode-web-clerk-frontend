import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from "@angular/forms";
import { Procedure } from '@core/models/procedure.model';
import { ProceduresService } from '@core/services/procedures.service';
import { columnProcedures } from '@features/admin-basic-data/constants/columns-procedures';
import { getFinalStringRoleNames } from '@vex/utils/get-final-string-role-names';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-procedures',
  templateUrl: './list-of-procedures.component.html',
  styleUrls: ['./list-of-procedures.component.scss']
})
export class ListOfProceduresComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.state = 'loading';
    this.procedureService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((process: Procedure) => {
            return {
              ...process,
              role: getFinalStringRoleNames(process.role),
              linkButtonEdit: `edit/${process.id}`,
              linkButtonReview: `review/${process.id}`,
              linkButtonDelete: `delete/${process.id}`,
            };
          });
          this.dataTableProcedures = data;
        }
      })
  }

  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnProcedures;
  dataTableProcedures: any[] = [];
  state: string = 'idle';

  constructor(private procedureService: ProceduresService) { }

  ngOnInit(): void {
    this.getProceduresList()
  }

  getProceduresList(){
    this.state = 'loading';
    this.procedureService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((process: Procedure) => {
            return {
              ...process,
              role: getFinalStringRoleNames(process.role),
              linkButtonEdit: `edit/${process.id}`,
              linkButtonReview: `review/${process.id}`,
              linkButtonDelete: `delete/${process.id}`,
            }
          })
          this.dataTableProcedures = data;
        }
      })
  }

  handleDeleteEvent(field: any): void {
    Swal.fire({
      title: `Seguro que quieres eliminar el siguiente Trámite?`,
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
        this.procedureService.delete(field.id)
          .pipe(
            switchMap(() => this.procedureService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((process: Procedure) => {
                return {
                  ...process,
                  linkButtonEdit: `edit/${process.id}`,
                  linkButtonReview: `review/${process.id}`,
                  linkButtonDelete: `delete/${process.id}`,
                }
              })
              this.dataTableProcedures = data;
              Swal.fire({
                position: 'bottom-end',
                html: '<p>Trámite eliminado</p>',
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


