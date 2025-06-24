import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthorizedUsersService } from '@core/services/authorized-users.service';
import { map, mergeMap, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-authorized-users',
  templateUrl: './create-authorized-users.component.html',
  styleUrls: ['./create-authorized-users.component.scss']
})
export class CreateAuthorizedUsersComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  state: string = 'idle';
  authorizedUsersForm!: FormGroup;
  roles = [];
  onlyRead: boolean = false;
  updatePersonType: boolean = false;
  idPersonType: number;
  selectedRole: any = {
    label: '',
    value: '',
    email: ''
  };

  constructor(
    private authorizedUsersService: AuthorizedUsersService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.authorizedUsersForm = this.fb.group({
      role: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.state = 'loading';

    this.authorizedUsersService.getBiaRoles()
      .subscribe(data => {
        this.state = 'success';
        this.roles = data.map(item => ({ label: item.label, value: item.value, email: item.email }));

        this.route.url.pipe(
          mergeMap(segments => {
            if (segments.length > 1) {
              if (segments[1].path === 'review') {
                this.onlyRead = true;
                this.updatePersonType = false;
                this.authorizedUsersForm.controls.role.disable();
                // this.authorizedUsersForm.controls.email.disable();
              } else if (segments[1].path === 'edit') {
                this.onlyRead = false;
                this.updatePersonType = true;
              }
              const segmentPath = segments[2].path;
              this.selectedRole = this.roles.find(role => role.value === segmentPath) || '';
              return of(null);
            } else {
              return of(null);
            }
          })
        ).subscribe();
      });
  }

  compareRoles(role1: any, role2: any): boolean {
    return role1 && role2 && role1.value === role2.value;
  }

  onSubmit(values: any) {
    if (this.authorizedUsersForm.invalid) {
      this.authorizedUsersForm.markAllAsTouched();
      return;
    }

    const formattedValues = {
      username: values.role.value,
      email: values.role.email
    };

    if (this.updatePersonType) {
      values.id = this.idPersonType;
      this.authorizedUsersService.put(this.idPersonType, formattedValues)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Usuario autorizado actualizado</p>',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            })

            this.router.navigate(['/manage-licenses/authorized-users']);
          },
          error: (err) => {
            console.log("err: ", err);
          }
        });
    } else {
      this.authorizedUsersService.post(formattedValues)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Usuario autorizado creado</p>',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            })

            this.formSubmitted.emit();
          },
          error: (err) => {
            console.log("err: ", err);
          }
        });
    }
  }
}
