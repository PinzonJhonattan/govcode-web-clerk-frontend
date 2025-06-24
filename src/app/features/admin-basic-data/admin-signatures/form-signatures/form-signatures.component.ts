import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Signature } from '@core/models/signature.model';
import { SignaturesService } from '@core/services/signature.service';
import { map, mergeMap, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import {ManageUsersService} from "@features/manage-users/services/manage-users.service";

@Component({
  selector: 'app-form-signatures',
  templateUrl: './form-signatures.component.html',
  styleUrls: ['./form-signatures.component.scss']
})
export class FormSignaturesComponent implements OnInit {
  @ViewChild('fileImage', { static: false }) fileImage: ElementRef;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  public signatureForm: FormGroup;
  public fileName: string;
  public fileUploaded = false;
  public fileType: string;
  state: string = 'idle';
  public idSignature: number;
  public buttonUploadTitle: string = '';
  public updateSignature: boolean = false;
  public changeFileInput: boolean = false;
  clerkUsers : any[];

  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private signatureService: SignaturesService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private usersClerkService : ManageUsersService

  ) {
    this.signatureForm = this.fb.group({
      username: ['', Validators.required],
      signatureFile: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getClerkUsers();
    this.route.url.pipe(
      mergeMap(segments => {
        if (segments.length > 1) {
          this.state = 'loading';
          if (segments[1].path === 'edit') {
            this.updateSignature = true;
            this.idSignature = parseInt(segments[2].path);
          }
          return this.signatureService.getById(this.idSignature).pipe(
            map((signature: Signature) => {
              this.fileName = signature.name;
              this.buttonUploadTitle = 'Actualizar firma'
              this.signatureForm.controls['username'].setValue(signature.name.split('-')[1]);
              this.state = 'success';
              return signature;
            })
          );
        } else {
          this.state = 'success';
          this.buttonUploadTitle = 'Subir Firma';
          return of(null);
        }
      })
    ).subscribe();
  }

  triggerFileImage() {
    this.fileImage.nativeElement.click();
  }

  handleFileInput(event) {
    const file = event.target.files[0];
    if (file) {
      this.changeFileInput = true;
      this.fileName = file.name;
      this.fileUploaded = true;
      this.fileType = file.type.split('/')[1];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.signatureForm.patchValue({
          signatureFile: reader.result.toString().split(',')[1]
        });
      };
    }
  }

  onSubmit() {
    if (this.signatureForm.invalid) {
      this.signatureForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const formValue = this.signatureForm.value;
    const payload: any = {
      name: `firma-${formValue.username}`,
      filename: `firma-${formValue.username}.${this.fileType}`,
      file: formValue.signatureFile
    };

    if (this.updateSignature) {
      payload.id = this.idSignature;
      payload.type = 'signature';
      this.signatureService.put(this.idSignature, payload)
        .subscribe({
          next: () => {
            this.loading = false;
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Firma digital actualizada con éxito</p>',
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
      this.signatureService.post(this.signatureForm.value.username, payload)
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
              html: '<p>Firma digital subida con éxito</p>',
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
  getClerkUsers(){
    this.usersClerkService.getUsers().subscribe({
      next : (data) => {
        this.clerkUsers = data;
      },
      error : () => {
        console.error('Error al cargar los usuarios');
      }
    })
  }

}
