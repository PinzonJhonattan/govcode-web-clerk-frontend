import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentificationTypesService } from '@core/services/identification-types.service';
import { map, mergeMap, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-identification-types',
  templateUrl: './create-identification-types.component.html',
  styleUrls: ['./create-identification-types.component.scss']
})
export class CreateIdentificationTypesComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  state: string = 'idle';
  identificationTypesForm!: FormGroup;
  roles = [];
  onlyRead: boolean = false;
  updateIdentificationType: boolean = false;
  idProcedureType: number;

  constructor(
    private identificationTypesService: IdentificationTypesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.identificationTypesForm = this.fb.group({
      name: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.route.url.pipe(
      mergeMap(segments => {
        if (segments.length > 1) {
          this.state = 'loading';
          if (segments[1].path === 'review') {
            this.onlyRead = true;
            this.updateIdentificationType = false;
            this.identificationTypesForm.controls.name.disable();
          } else if(segments[1].path === 'edit') {
            this.onlyRead = false;
            this.updateIdentificationType = true;
          }
          this.idProcedureType = parseInt(segments[2].path);
          return this.identificationTypesService.getById(this.idProcedureType).pipe(
            map(procedure => {
              this.identificationTypesForm.patchValue(procedure);
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
    if (this.identificationTypesForm.invalid) {
      this.identificationTypesForm.markAllAsTouched();
      return;
    }

    if(this.updateIdentificationType) {
      values.id = this.idProcedureType;
      this.identificationTypesService.put(this.idProcedureType, values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Tipo de trámite actualizado</p>',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            })

            // this.formSubmitted.emit();
            this.router.navigate(['/admin/identification-types']);
          },
          error: (err) => {
            console.log("err: ", err);
          }
        });
      return;
    } else {
      this.identificationTypesService.post(values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Tipo de trámite creado</p>',
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
