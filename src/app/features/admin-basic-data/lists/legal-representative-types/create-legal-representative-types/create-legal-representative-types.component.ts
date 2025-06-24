import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LegalRepresentativeTypesService } from '@core/services/legal-representative-types.service';
import { map, mergeMap, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-legal-representative-types',
  templateUrl: './create-legal-representative-types.component.html',
  styleUrls: ['./create-legal-representative-types.component.scss']
})
export class CreateLegalRepresentativeTypesComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  state: string = 'idle';
  legalRepresentativeTypesForm!: FormGroup;
  roles = [];
  onlyRead: boolean = false;
  updateProcedureType: boolean = false;
  idProcedureType: number;

  constructor(
    private legalRepresentativeTypesService: LegalRepresentativeTypesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.legalRepresentativeTypesForm = this.fb.group({
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
            this.updateProcedureType = false;
            this.legalRepresentativeTypesForm.controls.name.disable();
          } else if(segments[1].path === 'edit') {
            this.onlyRead = false;
            this.updateProcedureType = true;
          }
          this.idProcedureType = parseInt(segments[2].path);
          return this.legalRepresentativeTypesService.getById(this.idProcedureType).pipe(
            map(procedure => {
              this.legalRepresentativeTypesForm.patchValue(procedure);
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
    if (this.legalRepresentativeTypesForm.invalid) {
      this.legalRepresentativeTypesForm.markAllAsTouched();
      return;
    }

    if(this.updateProcedureType) {
      values.id = this.idProcedureType;
      this.legalRepresentativeTypesService.put(this.idProcedureType, values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Tipo de representante legal actualizado</p>',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            })

            // this.formSubmitted.emit();
            this.router.navigate(['/admin/legal-representative-types']);
          },
          error: (err) => {
            console.log("err: ", err);
          }
        });
      return;
    } else {
      this.legalRepresentativeTypesService.post(values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>TTipo representante legal creado</p>',
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
