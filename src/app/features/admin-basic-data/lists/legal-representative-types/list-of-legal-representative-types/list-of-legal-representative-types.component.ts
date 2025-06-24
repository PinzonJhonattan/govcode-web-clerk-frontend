import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { LegalRepresentativeTypes } from '@core/models/lists';
import { LegalRepresentativeTypesService } from '@core/services/legal-representative-types.service';
import { columnLegalRepresentativeTypes } from '@features/admin-basic-data/constants/columns-legal-representative-types';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-legal-representative-types',
  templateUrl: './list-of-legal-representative-types.component.html',
  styleUrls: ['./list-of-legal-representative-types.component.scss']
})
export class ListOfLegalRepresentativeTypesComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.state = 'loading';
    this.legalRepresentativeTypesService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((process: LegalRepresentativeTypes) => {
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
  columns: any[] = columnLegalRepresentativeTypes;
  dataTableProcedures: any[] = [];
  state: string = 'idle';

  constructor(private legalRepresentativeTypesService: LegalRepresentativeTypesService) { }

  ngOnInit(): void {
    this.legalRepresentativeTypesService.get()
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
      title: `Seguro que quieres eliminar el siguiente tipo de representante legal?`,
      html: `Nombre: <b>${field.name}</b>`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'red',
      cancelButtonColor: 'green',
      // buttonsStyling: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.state = 'loading';
        this.legalRepresentativeTypesService.delete(field.id)
          .pipe(
            switchMap(() => this.legalRepresentativeTypesService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((procedureType: LegalRepresentativeTypes) => {
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
