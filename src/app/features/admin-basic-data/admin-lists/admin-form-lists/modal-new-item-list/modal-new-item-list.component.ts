import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-modal-new-item-list',
  templateUrl: './modal-new-item-list.component.html',
  styleUrls: ['./modal-new-item-list.component.scss']
})
export class ModalNewItemListComponent implements OnInit {

  formItemList = this.fb.group({
    label : ['', Validators.required],
    value : ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<ModalNewItemListComponent>,
    private fb: FormBuilder
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  addItem(){
    if(this.formItemList.invalid) {
      this.formItemList.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.formItemList.value);
  }
}
