import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jasper-reports-tramites-todos-los-tramites',
  templateUrl: './reportes-todos-los-tramites.component.html',
  styleUrls: ['./reportes-todos-los-tramites.component.scss']
})
export class ReporteTodosLosTramitesComponent implements OnInit {
  @Output() generarReporte = new EventEmitter<any>();

  mainForm: FormGroup;
  //textoError: any;

  date_format = "dd-MM";

  params: { [key: string]: any } = {};

  public opcionPorDefecto = { codigo: null, descripcion: "Seleccionar..." };

  constructor(
    private fb: FormBuilder,
  ) {
    this.mainForm = this.fb.group({
    })

  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.mainForm.invalid) {
      this.mainForm.markAllAsTouched();
      return;
    }
    this.params = {};
    this.generarReporte.emit(this.params);
  }

}
