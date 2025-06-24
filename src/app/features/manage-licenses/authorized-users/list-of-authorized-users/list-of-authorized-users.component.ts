import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from "@angular/forms";
import { AuthorizedUsers } from '@core/models/authorized-users.model';
import { AuthorizedUsersService } from '@core/services/authorized-users.service';
import { columnAuthorizedUsers } from '@features/manage-licenses/constants/columns-authorized-users';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-authorized-users',
  templateUrl: './list-of-authorized-users.component.html',
  styleUrls: ['./list-of-authorized-users.component.scss']
})
export class ListOfAuthorizedUsersComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.state = 'loading';
    this.authorizedUsersService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((user: AuthorizedUsers) => {
            return {
              ...user,
              linkButtonReview: `review/${user.username}`,
              linkButtonDelete: `delete/${user.id}`,
            }
          })
          this.dataTableAuthorizedUsers = data;
        }
      })
  }

  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnAuthorizedUsers;
  dataTableAuthorizedUsers: any[] = [];
  state: string = 'idle';

  constructor(private authorizedUsersService: AuthorizedUsersService) { }

  ngOnInit(): void {
    this.state = 'loading';
    this.authorizedUsersService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((user: AuthorizedUsers) => {
            return {
              ...user,
              linkButtonReview: `review/${user.username}`,
              linkButtonDelete: `delete/${user.id}`,
            }
          })
          this.dataTableAuthorizedUsers = data;
        }
      })
  }

  handleDeleteEvent(field: any): void {
    Swal.fire({
      title: `Seguro que quieres eliminar el siguiente usuario autorizado?`,
      html: `Nombre: <b>${field.username}</b>`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f44336',
      cancelButtonColor: '',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.state = 'loading';
        this.authorizedUsersService.delete(field.id)
          .pipe(
            switchMap(() => this.authorizedUsersService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((authorizedUsers: AuthorizedUsers) => {
                return {
                  ...authorizedUsers,
                  linkButtonEdit: `edit/${authorizedUsers.id}`,
                  linkButtonReview: `review/${authorizedUsers.id}`,
                  linkButtonDelete: `delete/${authorizedUsers.id}`,
                }
              })
              this.dataTableAuthorizedUsers = data;
              Swal.fire({
                position: 'bottom-end',
                html: '<p>Usuario autorizado eliminado</p>',
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
