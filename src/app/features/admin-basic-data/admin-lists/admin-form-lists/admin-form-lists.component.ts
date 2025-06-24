import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminListsService } from "@core/services/admin-lists.service";
import { columnEditAdminLists } from "@features/admin-basic-data/constants/columns-admin-lists";
import { map, mergeMap, of, switchMap, tap } from "rxjs";
import Swal from "sweetalert2";
import { UntypedFormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { EditListNameFormComponent } from "../edit-list-name-form/edit-list-name-form.component";
import { ModalNewItemListComponent } from "@features/admin-basic-data/admin-lists/admin-form-lists/modal-new-item-list/modal-new-item-list.component";
import { ListItem } from "@core/models/admin-lists.model";
import { APP_ROLES_PERMISSIONS } from "@core/constants/permissions";

@Component({
  selector: "app-admin-form-lists",
  templateUrl: "./admin-form-lists.component.html",
  styleUrls: ["./admin-form-lists.component.scss"],
})
export class AdminFormListsComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();
  layoutCtrl = new UntypedFormControl("fullwidth");

  state: string = "idle";
  adminListForm!: FormGroup;
  roles = [];
  displayRoles = [];

  idList: number;
  nameList: string;
  urlList: string;
  itemsList: ListItem[];

  updateList: boolean = false;
  columns: any[] = columnEditAdminLists;
  dataTable: any[] = [];

  constructor(
    private adminListsService: AdminListsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.adminListForm = this.fb.group({
      name: ["", Validators.required],
      url: [
        "",
        [Validators.required, Validators.pattern(/^[A-Za-z0-9_-]{4,}$/)],
      ],
      list: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.route.url
      .pipe(
        mergeMap((segments) => {
          if (segments.length > 1) {
            this.state = "loading";
            if (segments[1].path === "edit") {
              this.updateList = true;
            }
            this.idList = parseInt(segments[2].path);
            return this.adminListsService.getById(this.idList).pipe(
              map((items) => {
                this.adminListForm.controls.name.setValue(items.name);
                this.adminListForm.controls.url.setValue(items.url);
                this.dataTable = items.list.map((item) => ({
                  label: item?.label,
                  value: item?.value,
                }));

                // Almaceno las variables para un put
                this.nameList = items.name;
                this.urlList = items.url;
                this.itemsList = items.list;

                this.state = "success";
                return items;
              })
            );
          } else {
            return of(null);
          }
        })
      )
      .subscribe();
  }

  onSubmit(values: any) {
    if (this.adminListForm.invalid) {
      this.adminListForm.markAllAsTouched();
      return;
    }

    this.state = "loading";

    if (this.updateList) {
      values.id = this.idList;

      const combinedList = [
        ...this.dataTable.map((item) => ({
          label: item?.label,
          value: item?.value,
        })),
        ...this.adminListForm
          .get("list")
          .value.map((item) => ({ label: item?.label, value: item?.value })),
      ];

      const payload = {
        id: this.idList,
        name: this.adminListForm.value.name,
        url: this.adminListForm.value.url,
        list: combinedList,
      };

      this.adminListsService.put(this.idList, payload).subscribe({
        next: (resp) => {
          Swal.fire({
            position: "bottom-end",
            html: "<p>Lista actualizada</p>",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          this.state = "success";
          this.adminListForm.setControl("list", this.fb.array([]));
          this.loadData();
        },
        error: (err) => {
          this.state = "success";
          console.log("err: ", err);
        },
      });
    } else {
      values.list =
        this.adminListForm.get("list").value.length > 0
          ? this.adminListForm
              .get("list")
              .value.map((item) => ({ label: item?.label, value: item?.value }))
          : [];

      this.adminListsService.post(values).subscribe({
        next: (resp) => {
          Swal.fire({
            position: "bottom-end",
            html: "<p>Lista creada</p>",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          this.state = "success";
          this.formSubmitted.emit();
        },
        error: (err) => {
          this.state = "success";
          console.log("err: ", err);
        },
      });
    }
  }

  openEditNameModal(data) {
    data.id = this.idList;
    data.nameList = this.nameList;
    data.url = this.urlList;
    data.list = this.itemsList;
    const taskFormDialog = this.dialog.open(EditListNameFormComponent, {
      width: "400px",
      data,
    });
    taskFormDialog.afterClosed().subscribe((result) => {
      if (result && result?.edited) {
        this.loadData();
      }
    });
  }

  actionsButtons = {
    editName: (row) => {
      this.openEditNameModal(row);
    },
  };
  openEditModal = this.openEditNameModal.bind(this);

  handleDeleteEvent(field: unknown) {
    this.state = "loading";

    let dataAux: any[];
    dataAux = this.dataTable.filter((item) => item !== field);

    const combinedList = [
      ...dataAux.map((item) => ({ label: item?.label, value: item?.value })),
      ...this.adminListForm
        .get("list")
        .value.map((item) => ({ label: item?.label, value: item?.value })),
    ];

    const payload = {
      id: this.idList,
      name: this.adminListForm.value.name,
      url: this.adminListForm.value.url,
      list: combinedList,
    };

    this.adminListsService.put(this.idList, payload).subscribe({
      next: (resp) => {
        this.state = "success";
        Swal.fire({
          position: "bottom-end",
          html: `<p>Elemento eliminado con éxito</p>`,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        this.loadData();
      },
      error: (err) => {
        console.error("Error actualizando la lista: ", err);
        this.state = "success";
      },
    });
  }

  get itemControls() {
    return (this.adminListForm.get("list") as FormArray).controls;
  }

  addItem() {
    const addItemDialogRef = this.dialog.open(ModalNewItemListComponent, {
      width: "400px",
    });
    addItemDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const list = this.adminListForm.get("list") as FormArray;
        list.push(this.fb.group({ label: result.label, value: result.value }));
      }
    });
  }

  removeItem(index: number) {
    const list = this.adminListForm.get("list") as FormArray;
    list.removeAt(index);
  }

  protected readonly APP_ROLES_PERMISSIONS = APP_ROLES_PERMISSIONS;
}
