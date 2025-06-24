import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from "@angular/forms";
import { DischargeTypes } from '@core/models/lists';
import { DischargeTypesService } from '@core/services/discharge-types.service';
import { columnDischargeTypes } from '@features/admin-basic-data/constants/columns-discharge-types';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-discharge-types',
  templateUrl: './list-of-discharge-types.component.html',
  styleUrls: ['./list-of-discharge-types.component.scss']
})
export class ListOfDischargeTypesComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.state = 'loading';
    this.dischargeTypesService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((process: DischargeTypes) => {
            return {
              ...process,
              linkButtonEdit: `edit/${process.id}`,
              linkButtonReview: `review/${process.id}`,
              linkButtonDelete: `delete/${process.id}`,
            }
          })
          this.dataTableDischargeTypes = data;
        }
      })
  }

  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnDischargeTypes;
  dataTableDischargeTypes: any[] = [];
  state: string = 'idle';

  constructor(private dischargeTypesService: DischargeTypesService) { }

  ngOnInit(): void {
    this.state = 'loading';
    this.dischargeTypesService.get()
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
          this.dataTableDischargeTypes = data;
        }
      })
  }

  handleDeleteEvent(field: any): void {
    Swal.fire({
      title: `Seguro que quieres eliminar el siguiente tipo de descarga?`,
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
        this.dischargeTypesService.delete(field.id)
          .pipe(
            switchMap(() => this.dischargeTypesService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((procedureType: DischargeTypes) => {
                return {
                  ...procedureType,
                  linkButtonEdit: `edit/${procedureType.id}`,
                  linkButtonReview: `review/${procedureType.id}`,
                  linkButtonDelete: `delete/${procedureType.id}`,
                }
              })
              this.dataTableDischargeTypes = data;
              Swal.fire({
                position: 'bottom-end',
                html: '<p>Tipo de descarga eliminado</p>',
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
