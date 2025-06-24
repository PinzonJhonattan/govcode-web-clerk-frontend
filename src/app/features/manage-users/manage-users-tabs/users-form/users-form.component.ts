import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageUsersService } from '@features/manage-users/services/manage-users.service';
import { mustMatch } from '@features/manage-users/utils/passwordsMustMatch';
import {catchError, first, forkJoin, of, switchMap, tap} from 'rxjs';
import Swal from 'sweetalert2';
import {ManageRolesClerkService} from "@features/manage-users/services/roles.service";
import {customPatternValidator} from "@shared/validators/customPattern.validator";

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  state: string = 'idle';
  usersForm!: FormGroup;
  editUser: boolean = false;
  idUser: string;
  listOfRoles: any[] = [];
  listOfSystemRoles : any[] = [];

  selectedRolesFromArray: any[];
  selectedSystemRoles: any[];

  visiblePassword = false;
  visibleRepeatPassword = false;
  inputTypePassword = "password"
  inputTypeRepeatPassword = "password"

  constructor(
    private manageUsersService: ManageUsersService,
    private rolesService: ManageRolesClerkService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    this.usersForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(40), customPatternValidator(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9.]+$/, 'El nombre de usuario debe contener minimo una letra. Puede tener puntos y números, sin espacios')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      enabled: [true, Validators.required],
      emailVerified: [true, Validators.required],
      roles: [[], Validators.required],
      systemRoles: [[]],
      password: [''],
      confirmPassword: ['']
    }, { validator: mustMatch('password', 'confirmPassword') });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        if (params.id) {
          this.idUser = params.id;
          this.editUser = true;
          return this.manageUsersService.getUserById(this.idUser)
            .pipe(
              first(),
              catchError(error => {
                console.error('Error fetching user:', error);
                return of(null);
              })
            );
        } else {
          return of(null);
        }
      }),
      switchMap(user => {
        if (user) {
          this.usersForm.patchValue(user);
          this.selectedRolesFromArray = user.roles.map((role: any) => {
            return role.id;
          });
          this.selectedSystemRoles = user.roles.map((role : any) => {
            return role.id
          })
        } else {
          this.editUser = false;
          this.usersForm.get('password').setValidators([
            Validators.required,
            customPatternValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/, 'La contraseña no cumple con el formato especificado (Mínimo ocho (8) caracteres, un número, una letra minúscula, una letra mayúscula)')]);
          this.usersForm.get('confirmPassword').setValidators([Validators.required]);
        }
        return forkJoin(({
          actorRoles : this.rolesService.getActorRoles(),
          systemRoles : this.rolesService.getApplicationRoles()
        }))
      })
    ).subscribe({
      next: (data) => {
        const { actorRoles, systemRoles} = data;
        this.listOfRoles = actorRoles;
        this.listOfSystemRoles = systemRoles
      },
      error: (error) => {
        console.error("Error fetching roles:", error);
      }
    });
  }

  onSubmit(): void {
    if(this.editUser){
      this.usersForm.controls['password'].clearValidators();
      this.usersForm.controls['confirmPassword'].clearValidators();
    }

    if (this.usersForm.invalid) {
      this.usersForm.markAllAsTouched();
      return;
    }

    let selectedActorRoles = this.listOfRoles.filter((role: any) => {
      return this.selectedRolesFromArray.includes(role.id);
    });

    let selectedSystemRoles = this.listOfSystemRoles.filter((role: any) => {
      return this.selectedSystemRoles.includes(role.id);
    });
    // Selected roles only asks for id, name and description
    const selectedRoles = [...selectedActorRoles,...selectedSystemRoles].map((role: any) => {
      return {
        id: role.id,
        name: role.name,
        description: role.description
      }
    });


    const user = {
      ...this.usersForm.value,
      roles: selectedRoles
    };

    if(this.editUser) {
      Swal.fire({
        title: `Seguro que quieres actualizar los datos del funcionario?`,
        showCancelButton: true,
        confirmButtonText: "Si, guardar datos",
        cancelButtonText: 'Cancelar',
        confirmButtonColor: 'rgb(var(--color-primary))',
        cancelButtonColor: '',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.state = 'loading';
          this.manageUsersService.updateUser(this.idUser, user)
            .pipe(
              tap(() => {
                this.state = 'success';
                this.formSubmitted.emit();
                this.router.navigate(['/gestion-usuarios-funcionarios/usuarios']);
              }),
            )
            .subscribe({
              next: (data) => {
                Swal.fire({
                  html: `<p>Usuario actualizado exitosamente</p>`,
                  position: 'bottom-end',
                  timer: 3000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                });
              },
              error: (error) => {
                this.state = 'error';
                Swal.fire({
                  html: `<p>${error?.error?.message || 'Ha ocurrido un error al editar el usuario'}</p>`,
                  position: 'bottom-end',
                  timer: 3000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                });
                console.error("error: ", error);
              }
            });
        }
      })
    } else {
      this.state = 'loading';

      this.manageUsersService.createUser(user)
        .pipe(
          tap(() => {
            this.state = 'success';
            this.formSubmitted.emit();
          }),
        )
        .subscribe({
          next: (data) => {
            Swal.fire({
              icon: 'success',
              html: `<p>'Usuario creado exitosamente'</p>`,
              position: 'bottom-end',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          },
          error: (error) => {
            this.state = 'error';
            Swal.fire({
              icon: 'error',
              html: `<p>${error?.error?.message || 'Error al crear el usuario'}</p>`,
              position: 'bottom-end',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            console.error("error: ", error);
          }
        });
    }
  }

  toggleVisibilityPassword() {
    if (this.visiblePassword) {
      this.inputTypePassword = "password";
      this.visiblePassword = false;
      this.cd.markForCheck();
    } else {
      this.inputTypePassword = "text";
      this.visiblePassword = true;
      this.cd.markForCheck();
    }
  }

  toggleVisibilityRepeatPassword() {
    if (this.visibleRepeatPassword) {
      this.inputTypeRepeatPassword = "password";
      this.visibleRepeatPassword = false;
      this.cd.markForCheck();
    } else {
      this.inputTypeRepeatPassword = "text";
      this.visibleRepeatPassword = true;
      this.cd.markForCheck();
    }
  }

}
