import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Signature } from '@core/models/signature.model';
import { SignaturesService } from '@core/services/signature.service';
import { columnSignatures } from '@features/admin-basic-data/constants/columns-signature';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-signatures',
  templateUrl: './list-of-signatures.component.html',
  styleUrls: ['./list-of-signatures.component.scss']
})
export class ListOfSignaturesComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.state = 'loading';
    this.signatureService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((signature: Signature) => {
            return {
              ...signature,
              linkButtonEdit: `edit/${signature.id}`,
              linkButtonDelete: `delete/${signature.id}`,
            }
          })
          this.dataTableSignatures = data;
        }
      })
  }

  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnSignatures;
  dataTableSignatures: any[] = [];
  state: string = 'idle';

  constructor(private signatureService: SignaturesService) { }

  ngOnInit(): void {

  }

  getSignaturesList(){
    this.signatureService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((signature: Signature) => {
            return {
              ...signature,
              linkButtonEdit: `edit/${signature.id}`,
              linkButtonDelete: `delete/${signature.id}`,
            }
          })
          this.dataTableSignatures = data;
        },
        error: (error: any) => {
          console.log("error: ", error);
        }
      })
  }

  handleDeleteEvent(field: any): void {
    Swal.fire({
      title: `Seguro que quieres eliminar la siguiente firma?`,
      html: `Nombre: <b>${field.name}</b>`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f44336',
      cancelButtonColor: '',
      // buttonsStyling: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.state = 'loading';
        this.signatureService.delete(field.id)
          .pipe(
            switchMap(() => this.signatureService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((signature: Signature) => {
                return {
                  ...signature,
                  linkButtonEdit: `edit/${signature.id}`,
                  linkButtonReview: `review/${signature.id}`,
                  linkButtonDelete: `delete/${signature.id}`,
                }
              })
              this.dataTableSignatures = data;
              Swal.fire({
                position: 'bottom-end',
                html: '<p>Plantilla eliminada</p>',
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
              })
            }
          })
      }
    })
  }

}
