import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProceduresService } from '@core/services/procedures.service';
import { UserService } from '@core/services/user.service';
import { getFinalStringRoleNames } from '@vex/utils/get-final-string-role-names';
import { map, mergeMap, of, switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';
import {customPatternValidator} from "@shared/validators/customPattern.validator";

@Component({
  selector: 'app-create-procedures',
  templateUrl: './create-procedures.component.html',
  styleUrls: ['./create-procedures.component.scss']
})
export class CreateProceduresComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  state: string = 'idle';
  procedureForm!: FormGroup;
  roles = [];
  displayRoles = [];
  onlyRead: boolean = false;
  updateProcedure: boolean = false;
  idProcedure: number;

  constructor(
    private procedureService: ProceduresService,
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.procedureForm = this.fb.group({
      name: ['', Validators.required],
      camundaId: ['', Validators.required],
      radicateDescription: ['', Validators.required],
      consultDescription: ['', Validators.required],
      continueRadicateDescription : ['', Validators.required],
      tutorialUrl : ['', Validators.required],
      emailContact : ['', [Validators.required, customPatternValidator(/^([^,]+)(,[^,]+)*$/, "La lista de correos no es valida, debe ser una lista separada por comas")]],
      phoneContact : ['', [Validators.required, customPatternValidator(/^([^,]+)(,[^,]+)*$/, "La lista de teléfonos no es valida, debe ser una lista separada por comas")]],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.state = 'loading';
    this.userService.getUsersRoles().pipe(
      switchMap((data) => {
        this.roles = data;
        this.displayRoles = this.roles.map(role => getFinalStringRoleNames(role?.name));

        return this.route.url.pipe(
          mergeMap(segments => {
            if (segments.length > 1) {
              if (segments[1].path === 'review') {
                this.onlyRead = true;
                this.updateProcedure = false;
                this.procedureForm.controls.name.disable();
                this.procedureForm.controls.camundaId.disable();
                this.procedureForm.controls.radicateDescription.disable();
                this.procedureForm.controls.consultDescription.disable();
                this.procedureForm.controls.continueRadicateDescription.disable();
                this.procedureForm.controls.role.disable();
                this.procedureForm.controls.tutorialUrl.disable();
                this.procedureForm.controls.emailContact.disable();
                this.procedureForm.controls.phoneContact.disable();

              } else if (segments[1].path === 'edit') {
                this.onlyRead = false;
                this.updateProcedure = true;
              }
              this.idProcedure = parseInt(segments[2].path);
              return this.procedureService.getById(this.idProcedure).pipe(
                map((procedure : any) => {
                  this.procedureForm.patchValue({
                    ...procedure,
                    emailContact: procedure.emailContact.join(','),
                    phoneContact: procedure.phoneContact.join(','),
                  });
                  this.state = 'success';
                  return procedure;
                })
              );
            } else {
              this.state = 'success';
              return of(null);
            }
          })
        );
      })
    ).subscribe();
  }

  // ngOnInit(): void {
  //   this.userService.getUsersBiaRoles().subscribe({
  //     next: (data) => {
  //       this.roles = data;
  //       this.displayRoles =
  //         this.roles
  //           .map(role => getFinalStringRoleNames(role.label));
  //     },
  //     error: (err) => {
  //       console.log("err: ", err);
  //     }
  //   })

  //   this.route.url.pipe(
  //     mergeMap(segments => {
  //       if (segments.length > 1) {
  //         this.state = 'loading';
  //         if (segments[1].path === 'review') {
  //           this.onlyRead = true;
  //           this.updateProcedure = false;
  //           this.procedureForm.controls.name.disable();
  //           this.procedureForm.controls.camundaId.disable();
  //           this.procedureForm.controls.radicateDescription.disable();
  //           this.procedureForm.controls.consultDescription.disable();
  //           this.procedureForm.controls.role.disable();
  //         } else if (segments[1].path === 'edit') {
  //           this.onlyRead = false;
  //           this.updateProcedure = true;
  //         }
  //         this.idProcedure = parseInt(segments[2].path);
  //         return this.procedureService.getById(this.idProcedure).pipe(
  //           map(procedure => {
  //             this.procedureForm.patchValue(procedure);
  //             this.state = 'success';
  //             return procedure;
  //           })
  //         );
  //       } else {
  //         return of(null);
  //       }
  //     })
  //   ).subscribe();

  // }

  onSubmit(values: any) {
    if (this.procedureForm.invalid) {
      this.procedureForm.markAllAsTouched();
      return;
    }
    values.emailContact = this.procedureForm.controls.emailContact.value.split(',');
    values.phoneContact = this.procedureForm.controls.phoneContact.value.split(',');
    if (this.updateProcedure) {
      values.id = this.idProcedure;
      this.procedureService.put(this.idProcedure, values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Trámite actualizado</p>',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            })

            this.router.navigate(['/admin/tramites']);
          },
          error: (err) => {
            console.log("err: ", err);
          }
        });
    } else {

      this.procedureService.post(values)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              position: 'bottom-end',
              html: '<p>Trámite creado</p>',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            })

            this.formSubmitted.emit();
          },
          error: (err) => {
            console.log("err: ", err);
          }
        });
    }

  }

}
