import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WaterSourcesService } from '@core/services/water-sources.service';
import Swal from 'sweetalert2';
import { map, mergeMap, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-create-water-sources',
  templateUrl: './create-water-sources.component.html',
  styleUrls: ['./create-water-sources.component.scss']
})
export class CreateWaterSourcesComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  state: string = 'idle';
  waterSourcesForm!: FormGroup;
  roles = [];
  onlyRead: boolean = false;
  updateWaterSource: boolean = false;
  idWaterSource: number;

  constructor(
    private waterSourcesService: WaterSourcesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.waterSourcesForm = this.fb.group({
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
            this.updateWaterSource = false;
            this.waterSourcesForm.controls.name.disable();
          } else if (segments[1].path === 'edit') {
            this.onlyRead = false;
            this.updateWaterSource = true;
          }
          this.idWaterSource = parseInt(segments[2].path);
          return this.waterSourcesService.getById(this.idWaterSource).pipe(
            map(procedure => {
              this.waterSourcesForm.patchValue(procedure);
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
    if (this.waterSourcesForm.invalid) {
      this.waterSourcesForm.markAllAsTouched();
      return;
    }

    if (this.updateWaterSource) {
      values.id = this.idWaterSource;
      this.waterSourcesService.put(this.idWaterSource, values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Fuente de agua actualizada</p>',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            })

            this.router.navigate(['/admin/water-sources']);
          },
          error: (err) => {
            console.log("err: ", err);
          }
        });
    } else {
      this.waterSourcesService.post(values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Fuente de agua creada</p>',
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
