import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from '@core/models/template.model';
import { TemplateService } from '@core/services/template.service';
import { map, mergeMap, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-templates',
  templateUrl: './form-templates.component.html',
  styleUrls: ['./form-templates.component.scss']
})
export class FormTemplatesComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  public templateForm: FormGroup;
  public fileName: string;
  public fileUploaded = false;
  state: string = 'idle';
  public idTemplate: number;
  public buttonUploadTitle: string = '';
  public updateTemplate: boolean = false;
  public changeFileInput: boolean = false;

  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private templateService: TemplateService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {
    this.templateForm = this.fb.group({
      templateFile: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.url.pipe(
      mergeMap(segments => {
        if (segments.length > 1) {
          this.state = 'loading';
          if (segments[1].path === 'edit') {
            this.updateTemplate = true;
            this.idTemplate = parseInt(segments[2].path);
          }
          return this.templateService.getById(this.idTemplate).pipe(
            map((template: Template) => {
              this.fileName = template.name;
              this.buttonUploadTitle = 'Actualizar plantilla';
              this.state = 'success';
              return template;
            })
          );
        } else {
          this.state = 'success';
          this.buttonUploadTitle = 'Subir Plantilla';
          return of(null);
        }
      })
    ).subscribe();
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event) {
    const file = event.target.files[0];
    if (file) {
      this.changeFileInput = true;
      this.fileName = file.name.split('.')[0];;
      this.fileUploaded = true;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.templateForm.patchValue({
          templateFile: reader.result.toString().split(',')[1]
        });
      };
    }
  }

  onSubmit() {
    if (this.templateForm.invalid) {
      this.templateForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const formValue = this.templateForm.value;
    const payload: any = {
      name: `${this.fileName}`,
      filename: `${this.fileName}.docx`,
      file: formValue.templateFile
    };

    if (this.updateTemplate) {
      payload.id = this.idTemplate;
      payload.type = 'template';
      this.templateService.put(this.idTemplate, payload)
        .subscribe({
          next: () => {
            this.loading = false;
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Plantilla actualizada con éxito</p>',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            });

            this.formSubmitted.emit();
          },
          error: (err) => {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              position: 'bottom-end',
              html: `<p>${err.error}</p>`,
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.cdr.detectChanges();
          }
        })
    } else {
      this.templateService.post(payload)
        .pipe(
          tap(() => {
            this.loading = false;
            this.cdr.detectChanges();
          })
        )
        .subscribe({
          next: (response) => {
            this.loading = false;
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Plantilla subida con éxito</p>',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            });

            this.formSubmitted.emit();
          },
          error: (err) => {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              position: 'bottom-end',
              html: `<p>${err.error}</p>`,
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.cdr.detectChanges();
          }
        });
    }

  }

}
