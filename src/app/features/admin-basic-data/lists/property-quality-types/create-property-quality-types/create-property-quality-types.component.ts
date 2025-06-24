import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyQualityTypesService } from '@core/services/property-quality-types.service';
import { map, mergeMap, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-property-quality-types',
  templateUrl: './create-property-quality-types.component.html',
  styleUrls: ['./create-property-quality-types.component.scss']
})
export class CreatePropertyQualityTypesComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  state: string = 'idle';
  propertyQualityTypesForm!: FormGroup;
  roles = [];
  onlyRead: boolean = false;
  updatePropertyQuality: boolean = false;
  idPropertyQualityType: number;

  constructor(
    private propertyQualityTypesService: PropertyQualityTypesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.propertyQualityTypesForm = this.fb.group({
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
            this.updatePropertyQuality = false;
            this.propertyQualityTypesForm.controls.name.disable();
          } else if (segments[1].path === 'edit') {
            this.onlyRead = false;
            this.updatePropertyQuality = true;
          }
          this.idPropertyQualityType = parseInt(segments[2].path);
          return this.propertyQualityTypesService.getById(this.idPropertyQualityType).pipe(
            map(procedure => {
              this.propertyQualityTypesForm.patchValue(procedure);
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
    if (this.propertyQualityTypesForm.invalid) {
      this.propertyQualityTypesForm.markAllAsTouched();
      return;
    }

    if (this.updatePropertyQuality) {
      values.id = this.idPropertyQualityType;
      this.propertyQualityTypesService.put(this.idPropertyQualityType, values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Tipo de calidad de propietario actualizado</p>',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            })

            this.router.navigate(['/admin/property-quality-types']);
          },
          error: (err) => {
            console.log("err: ", err);
          }
        });
    } else {
      this.propertyQualityTypesService.post(values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Tipo de calidad de propietario creado</p>',
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
