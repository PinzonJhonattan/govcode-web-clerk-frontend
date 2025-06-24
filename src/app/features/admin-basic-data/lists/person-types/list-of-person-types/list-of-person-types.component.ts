import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from "@angular/forms";
import { PersonTypes } from '@core/models/lists';
import { PersonTypesService } from '@core/services/person-types.service';
import { columnPersonTypes } from '@features/admin-basic-data/constants/columns-person-types';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-person-types',
  templateUrl: './list-of-person-types.component.html',
  styleUrls: ['./list-of-person-types.component.scss']
})
export class ListOfPersonTypesComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.state = 'loading';
    this.personTypesService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((process: PersonTypes) => {
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
  columns: any[] = columnPersonTypes;
  dataTablePersonTypes: any[] = [];
  state: string = 'idle';

  constructor(private personTypesService: PersonTypesService) { }

  ngOnInit(): void {
    this.state = 'loading';
    this.personTypesService.get()
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
      title: `Seguro que quieres eliminar el siguiente tipo de personas?`,
      html: `Nombre: <b>${field.name}</b>`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f44336',
      cancelButtonColor: '',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.state = 'loading';
        this.personTypesService.delete(field.id)
          .pipe(
            switchMap(() => this.personTypesService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((procedureType: PersonTypes) => {
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
                html: '<p>Tipo de persona eliminado</p>',
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
