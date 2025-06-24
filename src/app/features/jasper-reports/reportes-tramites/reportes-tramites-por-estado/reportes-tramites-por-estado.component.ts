import { Component, EventEmitter, OnInit, Output, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'jasper-reports-tramites-tramites-por-estado',
  templateUrl: './reportes-tramites-por-estado.component.html',
  styleUrls: ['./reportes-tramites-por-estado.component.scss']
})
export class ReporteTramitesPorEstadoComponent implements OnInit {
  @Output() generarReporte = new EventEmitter<any>();
  @Output() cambioFiltro = new EventEmitter<any>();

  @Input() codigoTramite: any;

  mainForm: FormGroup;
  //textoError: any;

  estadosReportes = [];

  parameters: { [key: string]: any } = {};

  public opcionPorDefecto = { codigo: null, descripcion: "Seleccionar..." };

  constructor(
    private fb: FormBuilder,
  ) {
    this.mainForm = this.fb.group({
      state: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this.eventCambioTramite();
  }

  eventCambioTramite(){
    if(this.codigoTramite == 3){
      this.estadosReportes = [
        {value: 'EXTERNALLY_TERMINATED', descripcion: 'Finalizado Externamente'},
        {value: 'COMPLETED', descripcion: 'Completado'},
        {value: 'ACTIVE', descripcion: 'Activo'}
      ];
    }
    if(this.codigoTramite == 4){
      this.estadosReportes = [
        {value: 'completed', descripcion: 'Completado'},
        {value: 'deleted', descripcion: 'Eliminado'}
      ];
    }
    this.cambioFiltro.emit();
  }

  onSubmit() {
    if (this.mainForm.invalid) {
      this.mainForm.markAllAsTouched();
      return;
    }
    this.parameters = {};
    this.parameters['state'] = this.mainForm.get('state')?.value;
    this.generarReporte.emit(this.parameters);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Revisa si `codigoTramite` ha cambiado
    if (changes.codigoTramite) {
      // Reaccionar al cambio en `codigoTramite`
      this.handleCodigoTramiteChange();
    }
  }

  handleCodigoTramiteChange() {
    this.eventCambioTramite();
  }

  onStateChange(event: any) {
    this.cambioFiltro.emit();
}


}
