import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeActivitiesService } from '@core/services/type-activities.service';
import { map, mergeMap, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-type-activities',
  templateUrl: './create-type-activities.component.html',
  styleUrls: ['./create-type-activities.component.scss']
})
export class CreateTypeActivitiesComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  state: string = 'idle';
  typesActivitiesForm!: FormGroup;
  roles = [];
  onlyRead: boolean = false;
  updatePersonType: boolean = false;
  idTypeActivitie: number;

  constructor(
    private typeActivitiesService: TypeActivitiesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.typesActivitiesForm = this.fb.group({
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
            this.typesActivitiesForm.controls.name.disable();
          } else if (segments[1].path === 'edit') {
            this.onlyRead = false;
            this.updatePersonType = true;
          }
          this.idTypeActivitie = parseInt(segments[2].path);
          return this.typeActivitiesService.getById(this.idTypeActivitie).pipe(
            map(procedure => {
              this.typesActivitiesForm.patchValue(procedure);
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
    if (this.typesActivitiesForm.invalid) {
      this.typesActivitiesForm.markAllAsTouched();
      return;
    }

    if (this.updatePersonType) {
      values.id = this.idTypeActivitie;
      this.typeActivitiesService.put(this.idTypeActivitie, values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Tipo de actividad actualizada</p>',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            })

            this.router.navigate(['/admin/type-activities']);
          },
          error: (err) => {
            console.log("err: ", err);
          }
        });
    } else {
      this.typeActivitiesService.post(values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Tipo de actividad creada</p>',
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
