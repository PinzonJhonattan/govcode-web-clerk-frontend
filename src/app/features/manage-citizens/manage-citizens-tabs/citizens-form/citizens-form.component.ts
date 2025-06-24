import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageCitizensService } from '@features/manage-citizens/services/manage-citizens.service';
import { mustMatch } from '@features/manage-users/utils/passwordsMustMatch';
import {catchError, first, forkJoin, of, switchMap, tap} from 'rxjs';
import Swal from 'sweetalert2';
import {ManageRolesCitizenService} from "@features/manage-citizens/services/roles.service";

@Component({
  selector: 'app-citizens-form',
  templateUrl: './citizens-form.component.html',
  styleUrls: ['./citizens-form.component.scss']
})
export class CitizensFormComponent implements OnInit {

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  state: string = 'idle';
  citizenForm!: FormGroup;
  editCitizen: boolean = false;
  idCitizen: string;

  listOfRoles: any[] = [];
  listOfSystemRoles : any[] = [];

  selectedRolesFromArray: any[];
  selectedSystemRoles: any[];

  constructor(
    private manageCitizensService: ManageCitizensService,
    private rolesCitizenService : ManageRolesCitizenService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.citizenForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      enabled: [true, Validators.required],
      emailVerified: [true, Validators.required],
      password: [''],
      roles: [[]],
      systemRoles: [[]],
      confirmPassword: ['']
    }, { validator: mustMatch('password', 'confirmPassword') });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        if (params.id) {
          this.idCitizen = params.id;
          this.editCitizen = true;
          return this.manageCitizensService.getCitizenById(this.idCitizen)
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
          this.citizenForm.patchValue(user);
          this.selectedRolesFromArray = user.roles?.map((role: any) => {
            return role.id;
          });
          this.selectedSystemRoles = user.roles?.map((role : any) => {
            return role.id
          })
        } else {
          this.editCitizen = false;
          this.citizenForm.get('password').setValidators([Validators.required, Validators.minLength(8)]);
          this.citizenForm.get('confirmPassword').setValidators([Validators.required]);
        }
        return forkJoin(({
          actorRoles : this.rolesCitizenService.getActorRoles(),
          systemRoles : this.rolesCitizenService.getApplicationRoles()
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


  onSubmit() {
    if (this.citizenForm.invalid) {
      this.citizenForm.markAllAsTouched();
      return;
    }

    this.state = 'loading';

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
      ...this.citizenForm.value,
      roles: selectedRoles
    };

    if(this.editCitizen) {
      this.manageCitizensService.updateCitizen(this.idCitizen, user)
        .pipe(
          tap(() => {
            this.state = 'success';
            this.formSubmitted.emit();
            this.router.navigate(['/gestion-usuarios-ciudadanos/usuarios']);
          }),
        )
        .subscribe({
          next: (data) => {
            this.state = 'success';
            Swal.fire({
              html: `<p>Ciudadano actualizado correctamente!</p>`,
              position: 'bottom-end',
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false
            })
          },
          error: (error) => {
            this.state = 'error';
            Swal.fire({
              html: `<p>Error al actualizar usuario</p>`,
              position: 'bottom-end',
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            console.error("error: ", error);
          }
        });
    } else {
      this.manageCitizensService.createCitizen(user)
        .pipe(
          tap(() => {
            this.state = 'success';
            this.formSubmitted.emit();
            this.router.navigate(['gestion-usuarios-ciudadanos/usuarios']);
          }),
        )
        .subscribe({
          next: (data) => {
            this.state = 'success';
            Swal.fire({
              html: `<p>Ciudadano creado exitosamente</p>`,
              position: 'bottom-end',
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false
            })
          },
          error: (error) => {
            this.state = 'error';
            Swal.fire({
              html: `<p>${error.error.error}</p>`,
              position: 'bottom-end',
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            console.error("error: ", error);
          }
        });
    }
  }

}
