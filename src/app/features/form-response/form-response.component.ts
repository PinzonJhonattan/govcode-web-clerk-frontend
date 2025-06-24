import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-responses',
  templateUrl: './form-response.component.html',
  styleUrls: ['./form-response.component.scss']
})
export class FormResponsesComponent implements OnInit {
  apiUrl: string = environment.apiUrlNest;
  formId: string = '';
  formulario: any = null;
  respuestas: any[] = [];
  filteredRespuestas: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const formId = params.get('formId');
      if (formId) {
        this.formId = formId;
        this.loadFormInfo();
        this.loadResponses();
      } else {
        // If no formId in the URL, redirect or show all responses
        this.loadAllResponses();
      }
    });
  }

  loadFormInfo() {
    if (!this.formId) return;

    this.http.get<any>(`${this.apiUrl}formularios/camunda/${this.formId}`)
      .subscribe({
        next: (data) => {
          this.formulario = data;
        },
        error: (error) => {
          console.error('Error al cargar la información del formulario', error);
        }
      });
  }

  loadResponses() {
    if (!this.formId) return;

    this.isLoading = true;
    this.error = '';

    this.http.get<any[]>(`${this.apiUrl}respuestas-formulario/${this.formId}`)
      .subscribe({
        next: (data) => {
          this.respuestas = data;
          this.filteredRespuestas = [...this.respuestas];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar las respuestas', error);
          this.error = 'No se pudieron cargar las respuestas. Intente de nuevo.';
          this.isLoading = false;
        }
      });
  }

  loadAllResponses() {
    this.isLoading = true;
    this.error = '';

    this.http.get<any[]>(`${this.apiUrl}respuestas-formulario`)
      .subscribe({
        next: (data) => {
          this.respuestas = data;
          this.filteredRespuestas = [...this.respuestas];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar todas las respuestas', error);
          this.error = 'No se pudieron cargar las respuestas. Intente de nuevo.';
          this.isLoading = false;
        }
      });
  }

  filterResponses() {
    if (!this.searchTerm.trim()) {
      this.filteredRespuestas = [...this.respuestas];
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredRespuestas = this.respuestas.filter(response => {
        // Si hay un ID de formulario, incluirlo en la búsqueda
        const formId = response.formId?.toLowerCase() || '';
        // Buscar en cualquier valor de texto en la respuesta
        const valuesStr = JSON.stringify(response.valores).toLowerCase();
        return formId.includes(term) || valuesStr.includes(term);
      });
    }
  }

  // Helper para visualizar valores del formulario
  formatValue(value: any): string {
    if (value === null || value === undefined) {
      return '-';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }
}
