import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-json-example-modal',
  template: `
    <h2 mat-dialog-title>Ejemplo de Estructura JSON</h2>
    <mat-dialog-content>
      <p class="description">Este es un ejemplo de estructura básica para el menú:</p>
      <pre class="json-example">{{data.jsonExample}}</pre>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="primary" (click)="copyToClipboard()">Copiar</button>
      <button mat-button (click)="close()">Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .description {
      margin-bottom: 16px;
      color: rgba(0, 0, 0, 0.6);
    }
    .json-example {
      background-color: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      overflow: auto;
      max-height: 500px;
      font-family: 'Roboto Mono', monospace;
      font-size: 13px;
      line-height: 1.5;
    }
  `]
})
export class JsonExampleModalComponent {
  constructor(
    public dialogRef: MatDialogRef<JsonExampleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jsonExample: string }
  ) {}

  copyToClipboard() {
    navigator.clipboard.writeText(this.data.jsonExample)
      .then(() => {
        console.log('JSON copiado al portapapeles');
      })
      .catch(err => {
        console.error('Error al copiar al portapapeles', err);
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}
