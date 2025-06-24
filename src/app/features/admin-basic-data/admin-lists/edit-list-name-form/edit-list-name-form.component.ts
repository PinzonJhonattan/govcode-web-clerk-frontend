import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminListsService } from '@core/services/admin-lists.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-list-name-form',
  templateUrl: './edit-list-name-form.component.html',
  styleUrls: ['./edit-list-name-form.component.scss']
})
export class EditListNameFormComponent implements OnInit {

  editNameForm: FormGroup;
  state: string = 'idle';

  constructor(
    private fb: FormBuilder,
    private adminListsService: AdminListsService,
    private editNameFormRef: MatDialogRef<EditListNameFormComponent>,
    @Inject(MAT_DIALOG_DATA) public listData: any
  ) { }

  ngOnInit(): void {
    this.editNameForm = this.fb.group({
      label: [this.listData.label, Validators.required],
      value: [this.listData.value, Validators.required]
    });
  }

  onSubmit() {
    if (this.editNameForm.invalid) {
      this.editNameForm.markAllAsTouched();
      return;
    }

    this.state = 'loading';

    const newItem = this.editNameForm.value;
    const index = this.listData.list.findIndex(item => item?.value === this.listData.value && item.label === this.listData.label);

    if (index !== -1) {
      this.listData.list[index] = newItem;
    } else {
      console.error("Item no encontrado en la lista");
      this.state = 'error';
      return;
    }

    const payload = {
      id: this.listData.id,
      name: this.listData.nameList,
      url: this.listData.url,
      list: this.listData.list
    };

    this.adminListsService.put(this.listData.id, payload)
      .subscribe({
        next: (resp) => {
          this.editNameFormRef.close({ edited: true });
          this.state = 'success';
          Swal.fire({
            position: "bottom-end",
            html: `<p>Lista actualizada</p>`,
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          })
        },
        error: (err) => {
          console.error(err);
          this.state = 'error';
          this.editNameFormRef.close();
          Swal.fire({
            position: 'bottom-end',
            html: `<p>Error al actualizar la lista</p>`,
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      })
  }


}
