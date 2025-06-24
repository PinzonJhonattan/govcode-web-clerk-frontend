import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonTypesService } from '@core/services/person-types.service';
import { UserService } from '@core/services/user.service';
import Swal from 'sweetalert2';
import { map, mergeMap, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-create-person-type',
  templateUrl: './create-person-type.component.html',
  styleUrls: ['./create-person-type.component.scss']
})
export class CreatePersonTypeComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  state: string = 'idle';
  personTypesForm!: FormGroup;
  roles = [];
  onlyRead: boolean = false;
  updatePersonType: boolean = false;
  idPersonType: number;

  constructor(
    private personTypesService: PersonTypesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.personTypesForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.url.pipe(
      mergeMap(segments => {
        if (segments.length > 1) {
          this.state = 'loading';
          if (segments[1].path === 'review') {
            this.onlyRead = true;
            this.updatePersonType = false;
            this.personTypesForm.controls.name.disable();
          } else if (segments[1].path === 'edit') {
            this.onlyRead = false;
            this.updatePersonType = true;
          }
          this.idPersonType = parseInt(segments[2].path);
          return this.personTypesService.getById(this.idPersonType).pipe(
            map(procedure => {
              this.personTypesForm.patchValue(procedure);
              this.state = 'success';
              return procedure;
            })
          );
        } else {
          return of(null);
        }
      })
    ).subscribe();
  }

  onSubmit(values: any) {
    if (this.personTypesForm.invalid) {
      this.personTypesForm.markAllAsTouched();
      return;
    }

    if (this.updatePersonType) {
      values.id = this.idPersonType;
      this.personTypesService.put(this.idPersonType, values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Tipo de persona actualizado</p>',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            })

            this.router.navigate(['/admin/person-types']);
          },
          error: (err) => {
            console.log("err: ", err);
          }
        });
    } else {
      this.personTypesService.post(values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Tipo de persona creado</p>',
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
