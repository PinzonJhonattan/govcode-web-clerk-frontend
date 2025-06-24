import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedureTypesService } from '@core/services/procedure-types.service';
import { map, mergeMap, of } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-procedure-types',
  templateUrl: './create-procedure-types.component.html',
  styleUrls: ['./create-procedure-types.component.scss']
})
export class CreateProcedureTypesComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  state: string = 'idle';
  procedureTypesForm!: FormGroup;
  roles = [];
  onlyRead: boolean = false;
  updateProcedureType: boolean = false;
  idProcedureType: number;

  constructor(
    private procedureTypesService: ProcedureTypesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.procedureTypesForm = this.fb.group({
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
            this.procedureTypesForm.controls.name.disable();
          } else if(segments[1].path === 'edit') {
            this.onlyRead = false;
            this.updateProcedureType = true;
          }
          this.idProcedureType = parseInt(segments[2].path);
          return this.procedureTypesService.getById(this.idProcedureType).pipe(
            map(procedure => {
              this.procedureTypesForm.patchValue(procedure);
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
    if (this.procedureTypesForm.invalid) {
      this.procedureTypesForm.markAllAsTouched();
      return;
    }

    if(this.updateProcedureType) {
      values.id = this.idProcedureType;
      this.procedureTypesService.put(this.idProcedureType, values)
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
            this.router.navigate(['/admin/procedure-types']);
          },
          error: (err) => {
            console.log("err: ", err);
          }
        });
      return;
    } else {
      this.procedureTypesService.post(values)
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
