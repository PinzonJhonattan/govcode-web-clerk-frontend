import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Template } from '@core/models/template.model';
import { TemplateService } from '@core/services/template.service';
import { columnTemplates } from '@features/admin-basic-data/constants/columns-templates';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-templates',
  templateUrl: './list-of-templates.component.html',
  styleUrls: ['./list-of-templates.component.scss']
})
export class ListOfTemplatesComponent implements OnInit {
  @Input() set comesFromCreateForm(data: boolean) {
    this.state = 'loading';
    this.templateService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((template: Template) => {
            return {
              ...template,
              linkButtonEdit: `edit/${template.id}`,
              linkButtonDelete: `delete/${template.id}`,
            }
          })
          this.dataTableTemplates = data;
        }
      })
  }

  layoutCtrl = new UntypedFormControl("fullwidth");
  columns: any[] = columnTemplates;
  dataTableTemplates: any[] = [];
  state: string = 'idle';

  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {
   this.getTemplates()
  }

  getTemplates(){
    this.state = 'loading';
    this.templateService.get()
      .subscribe({
        next: (data: any) => {
          this.state = 'success';
          data = data.map((template: Template) => {
            return {
              ...template,
              linkButtonEdit: `edit/${template.id}`,
              linkButtonDelete: `delete/${template.id}`,
            }
          })
          this.dataTableTemplates = data;
        }
      })
  }

  handleDeleteEvent(field: any): void {
    Swal.fire({
      title: `Seguro que quieres eliminar la plantilla?`,
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
        this.templateService.delete(field.id)
          .pipe(
            switchMap(() => this.templateService.get())
          )
          .subscribe({
            next: (data: any) => {
              this.state = 'success';
              data = data.map((template: Template) => {
                return {
                  ...template,
                  linkButtonEdit: `edit/${template.id}`,
                  linkButtonReview: `review/${template.id}`,
                  linkButtonDelete: `delete/${template.id}`,
                }
              })
              this.dataTableTemplates = data;
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
