import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reportes-tramites-otorgados-negados',
  templateUrl: './reportes-tramites-otorgados-negados.component.html',
  styleUrls: ['./reportes-tramites-otorgados-negados.component.scss']
})
export class ReportesTramitesOtorgadosNegadosComponent implements OnInit {
  @Output() generarReporte = new EventEmitter<any>();

  mainForm: FormGroup;

  params: { [key: string]: any } = {};

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
