import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from "@angular/forms";
import { TypeActivities } from '@core/models/lists';
import { TypeActivitiesService } from '@core/services/type-activities.service';
import { columnTypeActivities } from '@features/admin-basic-data/constants/columns-types-activities';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-list-of-type-activities',
  templateUrl: './list-of-type-activities.component.html',
  styleUrls: ['./list-of-type-activities.component.scss']
})
export class ListOfTypeActivitiesComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.state = 'loading';
    this.typeActivitiesService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((process: TypeActivities) => {
            return {
              ...process,
              linkButtonEdit: `edit/${process.id}`,
              linkButtonReview: `review/${process.id}`,
              linkButtonDelete: `delete/${process.id}`,
            }
          })
          this.dataTableTypeActivities = data;
        }
      })
  }

  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnTypeActivities;
  dataTableTypeActivities: any[] = [];
  state: string = 'idle';

  constructor(private typeActivitiesService: TypeActivitiesService) { }

  ngOnInit(): void {
    this.state = 'loading';
    this.typeActivitiesService.get()
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
          this.dataTableTypeActivities = data;
        }
      });
  }

  handleDeleteEvent(field: any): void {
    Swal.fire({
      title: `Seguro que quieres eliminar el siguiente tipo de actividad?`,
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
        this.typeActivitiesService.delete(field.id)
          .pipe(
            switchMap(() => this.typeActivitiesService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((procedureType: TypeActivities) => {
                return {
                  ...procedureType,
                  linkButtonEdit: `edit/${procedureType.id}`,
                  linkButtonReview: `review/${procedureType.id}`,
                  linkButtonDelete: `delete/${procedureType.id}`,
                }
              })
              this.dataTableTypeActivities = data;
              Swal.fire({
                position: 'bottom-end',
                html: '<p>Tipo de actividad eliminado</p>',
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
