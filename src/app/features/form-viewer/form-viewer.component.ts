import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { uiFormComponents, uiForms } from "@shared/constants/dynamicForm";
import { UntypedFormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { statesProcess } from "@shared/models/statesRequest.model";

@Component({
  selector: "app-form-viewer",
  templateUrl: "./form-viewer.component.html",
  styleUrls: ["./form-viewer.component.scss"],
})
export class FormViewerComponent implements OnInit {
  formTaskProcessState: statesProcess = "init";
  submitFormProcess: statesProcess = "init";
  submitMessage: string = "";
  messageErrorForm: string = "";
  layoutCtrl = new UntypedFormControl("boxed");
  apiUrl: string = environment.apiUrlNest;
  formsList: any[] = [];
  filteredForms: any[] = [];
  searchTerm: string = "";
  selectedFormId: string = "";
  selectedForm: any = null;
  formValues: any = {};
  formState: "init" | "loading" | "success" | "error" = "init";
  originServer = environment.apiUrl;
  directFormLoad: boolean = false;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const formId = params.get("formId");
      if (formId) {
        console.log("Cargando formulario directamente:", formId);
        this.directFormLoad = true;
        this.selectForm(formId);
      } else {
        this.directFormLoad = false;
        this.loadFormsList();
      }
    });
  }
  loadFormsList() {
    this.http.get<any[]>(`${this.apiUrl}formularios`).subscribe({
      next: (forms) => {
        this.formsList = forms;
        this.filteredForms = [...this.formsList];
        this.sortForms();
      },
      error: (error) => {
        console.error("Error al cargar la lista de formularios", error);
      },
    });
  }

  sortForms() {
    this.filteredForms.sort((a, b) => {
      const nameA = a.data?.id || a.formId;
      const nameB = b.data?.id || b.formId;
      return nameA.localeCompare(nameB);
    });
  }

  filterForms() {
    if (!this.searchTerm.trim()) {
      this.filteredForms = [...this.formsList];
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredForms = this.formsList.filter((form) => {
        const formId = form.formId?.toLowerCase() || "";
        const formName = form.data?.id?.toLowerCase() || "";
        const formType = form.data?.typeForm?.toLowerCase() || "";

        return (
          formId.includes(term) ||
          formName.includes(term) ||
          formType.includes(term)
        );
      });
    }
    this.sortForms();
  }

  selectForm(formId: string) {
    this.formState = "loading";
    this.selectedFormId = formId;

    this.http
      .get<any>(`${this.apiUrl}formularios/camunda/${formId}`)
      .subscribe({
        next: (formData) => {
          this.selectedForm = formData;
          console.log(formData);
          if (!this.selectedForm || !this.selectedForm.components) {
            console.error("Formato de respuesta incorrecto:", formData);
            this.formState = "error";
            this.messageErrorForm =
              "Formato de formulario inválido o incompleto.";
            return;
          }

          this.formState = "success";
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        error: (error) => {
          console.error("Error al cargar el formulario", error);
          this.formState = "error";
          this.messageErrorForm =
            "Error al cargar el formulario. Intente de nuevo.";
        },
      });
  }

  // backToList() {
  //   this.selectedFormId = '';
  //   this.selectedForm = null;
  //   this.formState = 'init';
  //   this.messageErrorForm = '';
  //   this.loadFormsList();
  // }

  backToList() {
    if (this.directFormLoad) {
      this.router.navigate(["/formularios"]);
    } else {
      this.selectedFormId = "";
      this.selectedForm = null;
      this.formState = "init";
      this.messageErrorForm = "";
      this.loadFormsList();
    }
  }
  // submitForm = ({ variables, isValidForm, component }: any): string => {
  //   this.messageErrorForm = "";
  //   if (!isValidForm()) {
  //     this.messageErrorForm =
  //       "Por favor, complete todos los campos requeridos correctamente";
  //     return this.messageErrorForm;
  //   }

  //   this.submitFormProcess = "loading";
  //   this.submitMessage = "Enviando formulario...";

  //   // this.cdr.detectChanges();

  //   this.http
  //     .post(`${this.apiUrl}formularios/submit`, {
  //       formId: this.selectedFormId,
  //       values: variables,
  //     })
  //     .subscribe({
  //       next: () => {
  //         this.submitFormProcess = "success";
  //         this.submitMessage = "Formulario enviado con éxito";

  //         if (component?.properties?.goto) {
  //           const gotoRoute = component.properties.goto.startsWith("/")
  //             ? component.properties.goto
  //             : `/formularios/${component.properties.goto}`;

  //           this.router.navigate([gotoRoute]);
  //         } else {
  //           this.backToList();
  //         }
  //       },
  //       error: (error) => {
  //         this.submitFormProcess = "error";
  //         this.submitMessage = "";
  //         this.messageErrorForm =
  //           "Error al enviar el formulario. Intente de nuevo.";
  //         console.error("Error al enviar el formulario", error);
  //       },
  //     });

  //   return "";
  // };

  /*
  submitForm = ({ variables, isValidForm, component }: any): string => {
    console.log(component, isValidForm, variables);
    this.messageErrorForm = "";

    if (!isValidForm()) {
      this.messageErrorForm = "Por favor, complete todos los campos requeridos correctamente";
      return this.messageErrorForm;
    }

    this.submitFormProcess = "loading";
    this.submitMessage = "Enviando formulario...";

    const submitButton = this.selectedForm.components.find(
      (comp: any) => comp.type === "button" && comp.action === "submit"
    );

    const gotoPath = submitButton?.properties?.goto;
    console.log("Valor de goto encontrado:", gotoPath);
console.log(submitButton?.properties)
    setTimeout(() => {
      this.submitFormProcess = "success";
      this.submitMessage = "Formulario enviado con éxito";

      setTimeout(() => {
        if (gotoPath) {

          const gotoRoute = gotoPath.startsWith("/")
            ? `/formularios${gotoPath}`
            : `/formularios/${gotoPath}`;

          console.log("Redirigiendo a:", gotoRoute);

          this.router.navigate([gotoRoute])
            .then(success => {
              if (!success) {
                console.error("Navegación fallida a:", gotoRoute);
                // window.location.href = gotoRoute;
              }
            })
            .catch(error => {
              console.error("Error durante la navegación:", error);
            });
        } else {
          console.log("No se encontró ruta de redirección, volviendo a la lista");
          this.backToList();
        }
      }, 1500);
    }, 1000);

    /*
    this.http
      .post(`${this.apiUrl}formularios/submit`, {
        formId: this.selectedFormId,
        values: variables,
      })
      .subscribe({
        next: () => {
          this.submitFormProcess = "success";
          this.submitMessage = "Formulario enviado con éxito";

          // Esperar un momento para que el usuario vea el mensaje de éxito
          setTimeout(() => {
            if (gotoPath) {
              const gotoRoute = gotoPath.startsWith("/")
                ? `/formularios${gotoPath}`
                : `/formularios/${gotoPath}`;

              this.router.navigate([gotoRoute])
                .then(success => {
                  if (!success) {
                    console.error("Navegación fallida a:", gotoRoute);
                  }
                })
                .catch(error => {
                  console.error("Error durante la navegación:", error);
                });
            } else {
              this.backToList();
            }
          }, 1500);
        },
        error: (error) => {
          this.submitFormProcess = "error";
          this.submitMessage = "";
          this.messageErrorForm = "Error al enviar el formulario. Intente de nuevo.";
          console.error("Error al enviar el formulario", error);
        },
      });


    return "";
  };
*/

  submitForm = ({ variables, isValidForm, component }: any): string => {
    console.log(component, isValidForm, variables);
    this.messageErrorForm = "";

    if (!isValidForm()) {
      this.messageErrorForm =
        "Por favor, complete todos los campos requeridos correctamente";
      return this.messageErrorForm;
    }

    this.submitFormProcess = "loading";
    this.submitMessage = "Enviando formulario...";

    const submitButton = this.selectedForm.components.find(
      (comp: any) => comp.type === "button" && comp.action === "submit"
    );

    const gotoPath = submitButton?.properties?.goto;

    this.http
      .post(`${this.apiUrl}respuestas-formulario`, {
        formId: this.selectedFormId,
        valores: variables,
      })
      .subscribe({
        next: (response) => {
          this.submitFormProcess = "success";
          this.submitMessage = "Formulario enviado con éxito";

          setTimeout(() => {
            if (gotoPath) {
              const gotoRoute = gotoPath.startsWith("/")
                ? `/formularios${gotoPath}`
                : `/formularios/${gotoPath}`;

              this.router
                .navigate([gotoRoute])
                .then((success) => {
                  if (!success) {
                    console.error("Navegación fallida a:", gotoRoute);
                  }
                })
                .catch((error) => {
                  console.error("Error durante la navegación:", error);
                });
            } else {
              this.backToList();
            }
          }, 1500);
        },
        error: (error) => {
          this.submitFormProcess = "error";
          this.submitMessage = "";
          this.messageErrorForm =
            "Error al enviar el formulario. Intente de nuevo.";
          console.error("Error al enviar el formulario", error);
        },
      });

    return "";
  };
  protected readonly uiForms = uiForms;
  protected readonly uiFormComponents = uiFormComponents;
}
