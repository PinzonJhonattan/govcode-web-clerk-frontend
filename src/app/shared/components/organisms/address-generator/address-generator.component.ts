import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  ModalAddressGeneratorComponent
} from "@shared/components/organisms/address-generator/modal-address-generator/modal-address-generator.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-address-generator',
  templateUrl: './address-generator.component.html',
  styleUrls: ['./address-generator.component.scss']
})
export class AddressGeneratorComponent implements OnInit {

  @Input() form : FormGroup = null;
  @Input() groupSection : FormGroup = null;
  @Input() propertiesComponent : any  = {};

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openModal() {
    let dialogRef = this.dialog.open(ModalAddressGeneratorComponent, {
      width: '1200px',
    });
    dialogRef.afterClosed().subscribe(result => {
      const keyAdress = this.propertiesComponent?.keyAddress;
      if(keyAdress && result){
        const form = this.groupSection ?  this.groupSection?.get(keyAdress) || this.form.controls[keyAdress] : this.form.controls[keyAdress]
        form?.setValue(result);
      }
    })
  }
}
