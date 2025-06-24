import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { AdminListsService } from '@core/services/admin-lists.service';
import { columnAdminLists } from '@features/admin-basic-data/constants/columns-admin-lists';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-admin-lists',
  templateUrl: './list-of-admin-lists.component.html',
  styleUrls: ['./list-of-admin-lists.component.scss']
})
export class ListOfAdminListsComponent implements OnInit {
  @Input() set comesFromForm(data: boolean) {
    this.state = 'loading';
    this.adminListsService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((item: any) => {
            return {
              ...item,
              linkButtonEdit: `edit/${item.id}`,
              linkButtonDelete: `delete/${item.id}`,
            }
          });
          this.dataTable = data;
        }
      })
  }

  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnAdminLists;
  dataTable: any[] = [];
  state: string = 'idle';

  constructor(
    private adminListsService: AdminListsService
  ) { }

  ngOnInit(): void {
    this.getLists()
  }


  getLists(){
    this.state = 'loading';
    this.adminListsService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((item: any) => {
            return {
              ...item,
              linkButtonEdit: `edit/${item.id}`,
            }
          })
          this.dataTable = data;
        }
      })
  }

  handleDeleteEvent(field: any): void {
    Swal.fire({
      title: `Seguro que quieres eliminar la siguiente lista?`,
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
        this.adminListsService.delete(field.id)
          .pipe(
            switchMap(() => this.adminListsService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((process: any) => {
                return {
                  ...process,
                  linkButtonEdit: `edit/${process.id}`,
                  linkButtonDelete: `delete/${process.id}`,
                }
              })
              this.dataTable = data;
              Swal.fire({
                position: 'bottom-end',
                html: '<p>Lista eliminada</p>',
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
