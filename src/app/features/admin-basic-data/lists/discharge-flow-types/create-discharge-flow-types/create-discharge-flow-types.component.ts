import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DischargeFlowTypesService } from '@core/services/discharge-flow-types.service';
import { map, mergeMap, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-discharge-flow-types',
  templateUrl: './create-discharge-flow-types.component.html',
  styleUrls: ['./create-discharge-flow-types.component.scss']
})
export class CreateDischargeFlowTypesComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  state: string = 'idle';
  dischargeFlowTypesForm!: FormGroup;
  roles = [];
  onlyRead: boolean = false;
  updatePersonType: boolean = false;
  idDischargeType: number;

  constructor(
    private dischargeFlowTypesService: DischargeFlowTypesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.dischargeFlowTypesForm = this.fb.group({
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
            this.dischargeFlowTypesForm.controls.name.disable();
          } else if (segments[1].path === 'edit') {
            this.onlyRead = false;
            this.updatePersonType = true;
          }
          this.idDischargeType = parseInt(segments[2].path);
          return this.dischargeFlowTypesService.getById(this.idDischargeType).pipe(
            map(procedure => {
              this.dischargeFlowTypesForm.patchValue(procedure);
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
    if (this.dischargeFlowTypesForm.invalid) {
      this.dischargeFlowTypesForm.markAllAsTouched();
      return;
    }

    if (this.updatePersonType) {
      values.id = this.idDischargeType;
      this.dischargeFlowTypesService.put(this.idDischargeType, values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Tipo de descarga actualizada</p>',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            })

            this.router.navigate(['/admin/discharge-flow-types']);
          },
          error: (err) => {
            console.log("err: ", err);
          }
        });
    } else {
      this.dischargeFlowTypesService.post(values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Tipo de descarga creada</p>',
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
