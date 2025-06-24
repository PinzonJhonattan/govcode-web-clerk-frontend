import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl} from "@angular/forms";
import {VariablesService} from "@shared/services/variables.service";

@Component({
  selector: 'app-files-procedure',
  templateUrl: './files-procedure.component.html',
  styleUrls: ['./files-procedure.component.scss']
})
export class FilesProcedureComponent implements OnInit {
  layoutCtrl = new UntypedFormControl("boxed");
  stateSearchDocuments = 'init';
  documentsListed = {}
  isSearchDocuments = false;
  errorMessage = '';

  documentsForm = new FormGroup({
    instanceProcess: new FormControl(''),
  })

  constructor(private variablesService : VariablesService) { }

  ngOnInit(): void {
  }

  getAllProcedureDocuments() {
    this.isSearchDocuments = true;
    this.errorMessage = '';
    this.documentsListed = [];
    this.stateSearchDocuments = 'loading';
    this.variablesService.getProcedureDocuments(this.documentsForm.get('instanceProcess').value).subscribe({
      next: (data) => {
        this.stateSearchDocuments = 'success';
        this.documentsListed = data
      },
      error: (error) => {
        if(error.status === 404) {
          this.errorMessage = 'El número de radicado es incorrecto';
        }
        this.stateSearchDocuments = 'error';
      }
    });
  }

  protected readonly Object = Object;
}
