import { Component, OnInit, Input } from '@angular/core';
import { columnPropertyQualityTypes } from '@features/admin-basic-data/constants/columns-property-quality-types';
import { UntypedFormControl } from "@angular/forms";
import { PropertyQualityTypesService } from '@core/services/property-quality-types.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';
import { PropertyQualityTypes } from '@core/models/lists';

@Component({
  selector: 'app-list-of-property-quality-types',
  templateUrl: './list-of-property-quality-types.component.html',
  styleUrls: ['./list-of-property-quality-types.component.scss']
})
export class ListOfPropertyQualityTypesComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.state = 'loading';
    this.propertyQualityTypesService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((process: PropertyQualityTypes) => {
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
  columns: any[] = columnPropertyQualityTypes;
  dataTablePersonTypes: any[] = [];
  state: string = 'idle';

  constructor(private propertyQualityTypesService: PropertyQualityTypesService) { }

  ngOnInit(): void {
    this.state = 'loading';
    this.propertyQualityTypesService.get()
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
      title: `Seguro que quieres eliminar el siguiente tipo de calidad de propietario?`,
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
        this.propertyQualityTypesService.delete(field.id)
          .pipe(
            switchMap(() => this.propertyQualityTypesService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((procedureType: PropertyQualityTypes) => {
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
                html: '<p>Tipo de calidad de propietario eliminado</p>',
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
