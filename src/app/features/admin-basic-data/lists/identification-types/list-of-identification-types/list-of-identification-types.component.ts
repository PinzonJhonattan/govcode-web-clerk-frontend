import { Component, OnInit, Input } from '@angular/core';
import { columnIdentificationTypes } from '@features/admin-basic-data/constants/columns-identification-types';
import { UntypedFormControl } from "@angular/forms";
import Swal from 'sweetalert2';
import { IdentificationTypes } from '@core/models/lists';
import { IdentificationTypesService } from '@core/services/identification-types.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-list-of-identification-types',
  templateUrl: './list-of-identification-types.component.html',
  styleUrls: ['./list-of-identification-types.component.scss']
})
export class ListOfIdentificationTypesComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.state = 'loading';
    this.identificationTypesService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((process: IdentificationTypes) => {
            return {
              ...process,
              linkButtonEdit: `edit/${process.id}`,
              linkButtonReview: `review/${process.id}`,
              linkButtonDelete: `delete/${process.id}`,
            }
          })
          this.dataTablePersonTypes = data;
        }
      })
  }


  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnIdentificationTypes;
  dataTablePersonTypes: any[] = [];
  state: string = 'idle';

  constructor(private identificationTypesService: IdentificationTypesService) { }

  ngOnInit(): void {
    this.state = 'loading';
    this.identificationTypesService.get()
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
          this.dataTablePersonTypes = data;
        }
      })
  }

  handleDeleteEvent(field: any): void {
    Swal.fire({
      title: `Seguro que quieres eliminar el siguiente tipo de identificación?`,
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
        this.identificationTypesService.delete(field.id)
          .pipe(
            switchMap(() => this.identificationTypesService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((procedureType: IdentificationTypes) => {
                return {
                  ...procedureType,
                  linkButtonEdit: `edit/${procedureType.id}`,
                  linkButtonReview: `review/${procedureType.id}`,
                  linkButtonDelete: `delete/${procedureType.id}`,
                }
              })
              this.dataTablePersonTypes = data;
              Swal.fire({
                position: 'bottom-end',
                html: '<p>Tipo de identificación eliminado</p>',
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
