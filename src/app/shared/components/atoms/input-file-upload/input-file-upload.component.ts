import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { getErrorMessage } from "@shared/utils/getErrorMessage";

@Component({
  selector: 'app-input-file-upload',
  templateUrl: './input-file-upload.component.html',
  styleUrls: ['./input-file-upload.component.scss']
})
export class InputFileUploadComponent implements OnInit {

  @Input() fieldControl !: FormControl;
  @Input() label: string = "";
  @Input() name: string = "";

  nameFile: string = "";
  idInput: string = "";
  constructor() {
  }

  ngOnInit(): void {
    this.idInput = `upload-${this.name}`;
  }
  /**
   * Save file in form when value have changed
   * @param {Event} event - Event on change of file
   * @returns {void}
   */
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      // No se seleccionó un nuevo archivo, por lo tanto, no hacer nada
      return;
    }

    const file = input.files[0];
    this.nameFile = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const fileProperties = {
        value: (reader.result as string).split(",")[1],
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        refDocument: this.name
      };
      this.fieldControl.setValue({ ...file, ...fileProperties })
      this.fieldControl.markAsTouched()
      this.fieldControl.updateValueAndValidity();
    };
  }

  // onFileSelect(event: Event) {
  //   const file = (event?.target as any)?.files[0];
  //   if (!file) {
  //     this.nameFile = "";
  //     this.fieldControl.setValue(null)
  //     this.fieldControl.markAsTouched()
  //     this.fieldControl.updateValueAndValidity();
  //     return;
  //   }
  //   this.nameFile = file.name;
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     const fileProperties = {
  //       value: (reader.result as any).toString().split(",")[1],
  //       name: file.name,
  //       size : file.size,
  //       type : file.type,
  //       lastModified : file.lastModified,
  //       refDocument : this.name
  //     };
  //     this.fieldControl.setValue({...file, ...fileProperties})
  //     this.fieldControl.markAsTouched()
  //     this.fieldControl.updateValueAndValidity();
  //   };
  // }

  protected readonly getErrorMessage = getErrorMessage;
  protected readonly Validators = Validators;
}
