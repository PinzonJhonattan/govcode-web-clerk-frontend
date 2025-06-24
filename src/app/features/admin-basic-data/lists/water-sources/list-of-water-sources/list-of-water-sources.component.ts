import { Component, OnInit, Input } from '@angular/core';
import { columnWaterSource } from '@features/admin-basic-data/constants/columns-water-source';
import { UntypedFormControl } from "@angular/forms";
import { WaterSourcesService } from '@core/services/water-sources.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';
import { WaterSources } from '@core/models/lists';

@Component({
  selector: 'app-list-of-water-sources',
  templateUrl: './list-of-water-sources.component.html',
  styleUrls: ['./list-of-water-sources.component.scss']
})
export class ListOfWaterSourcesComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.state = 'loading';
    this.waterSourceService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((process: WaterSources) => {
            return {
              ...process,
              linkButtonEdit: `edit/${process.id}`,
              linkButtonReview: `review/${process.id}`,
              linkButtonDelete: `delete/${process.id}`,
            }
          })
          this.dataTableWaterSources = data;
        }
      })
  }

  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnWaterSource;
  dataTableWaterSources: any[] = [];
  state: string = 'idle';

  constructor(private waterSourceService: WaterSourcesService) { }

  ngOnInit(): void {
    this.state = 'loading';
    this.waterSourceService.get()
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
          this.dataTableWaterSources = data;
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
      confirmButtonColor: 'red',
      cancelButtonColor: 'green',
      // buttonsStyling: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.state = 'loading';
        this.waterSourceService.delete(field.id)
          .pipe(
            switchMap(() => this.waterSourceService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((procedureType: WaterSources) => {
                return {
                  ...procedureType,
                  linkButtonEdit: `edit/${procedureType.id}`,
                  linkButtonReview: `review/${procedureType.id}`,
                  linkButtonDelete: `delete/${procedureType.id}`,
                }
              })
              this.dataTableWaterSources = data;
              Swal.fire({
                position: 'bottom-end',
                html: '<p>Fuente de agua eliminada</p>',
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
