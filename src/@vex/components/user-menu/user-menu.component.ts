import { Component, OnInit } from "@angular/core";
import { PopoverRef } from "../popover/popover-ref";
import { TokenService } from "@core/services/token.service";
import { UserService } from "@core/services/user.service";
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { getFinalStringRoleNames } from "@vex/utils/get-final-string-role-names";
import {SearchModalComponent} from "@vex/components/search-modal/search-modal.component";
import {ChangePasswordComponent} from "@features/user-profile/change-password/change-password.component";

@Component({
  selector: "vex-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"]
})
export class UserMenuComponent implements OnInit {

  roles = [];
  optionsRolesHtml = '';

  constructor(
    // private readonly popoverRef: PopoverRef,
    private tokenService: TokenService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}


  ngOnInit(): void {

  }

  changeRole(role: string): void {
    this.userService.setCurrentRole(role);
    location.href = '/';
  }


  changePassword(){
    this.dialog.open(ChangePasswordComponent, {
      width: "100%",
      maxWidth: "600px"
    });
  }

  changeRoleModal(): void {
    this.roles = this.userService.getRoles()

    const actualRole = this.userService.getCurrentRole();

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('flex', 'justify-center', 'flex-wrap','overflow-y-auto', 'max-h-[60vh]');

    this.roles.forEach((role) => {
      if(!role.name?.includes('Rol T') && role?.name != actualRole?.name ) {
        const button = document.createElement('button');

        button.classList.add('mt-2', 'max-w-xs', 'block', 'w-full', 'rounded-md', 'px-3', 'py-2', 'bg-[#3366cc]', 'text-center', 'text-sm', 'font-semibold', 'text-white', 'shadow-sm', 'hover:bg-blue-900', 'focus-visible:outline', 'focus-visible:outline-2', 'focus-visible:outline-offset-2', 'focus-visible:outline-blue-950');
        button.textContent = role?.description

        button.addEventListener('click', () => {
          this.changeRole(role);
        });

        optionsContainer.appendChild(button);
      }
    });

    Swal.fire({
      title: 'Elección de rol',
      html: optionsContainer,
      showCloseButton: true,
      showConfirmButton: false,
      focusConfirm: false,
    });
  }

  close(): void {

    Swal.fire({
      title: 'Cerrar sesión',
      text: "¿Está seguro que desea cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        /** Wait for animation to complete and then close */
        // setTimeout(() => this.popoverRef.close(), 250);

        this.tokenService.removeToken();
        this.userService.removeUser();
        this.userService.removeCurrentRole()

        // redirect to /login
        window.location.href = '/login';

      } else {
        Swal.fire(
          'Cancelado',
          'La sesión no se ha cerrado',
          'error'
        );
      }
    })
  }
}
