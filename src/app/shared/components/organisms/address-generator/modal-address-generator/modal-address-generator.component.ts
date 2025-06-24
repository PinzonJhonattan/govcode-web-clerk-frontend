import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-address-generator',
  templateUrl: './modal-address-generator.component.html',
  styleUrls: ['./modal-address-generator.component.scss']
})
export class ModalAddressGeneratorComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  optionsDirections = {
    zone : [],
    viaDirection : [],
    letterDirection : [],
  }

  addressForm = new FormGroup({
    zone : new FormControl('', [Validators.required]),
    principalVia : new FormControl('', [Validators.required]),
    principalNameNumberVia : new FormControl('', [Validators.required]),
    principalLetter : new FormControl('', []),
    principalPrefixBis : new FormControl('', []),
    principalLetterPrefix : new FormControl('', []),
    secondaryVia : new FormControl('', [Validators.required]),
    secondaryNameNumberVia : new FormControl('', [Validators.required]),
    secondaryLetter : new FormControl('', []),
    secondarySuffixBis : new FormControl('', []),
    secondaryLetterSuffix : new FormControl('', []),
  })

  generateAddress = new FormGroup({
    address : new FormControl('', [Validators.required]),
  })
  constructor(private httpClient : HttpClient, public dialogRef: MatDialogRef<ModalAddressGeneratorComponent>,
  ) { }

  ngOnInit(): void {

    this.addressForm.valueChanges.subscribe(value => {
      this.generateAddress.controls.address.setValue(`${value.zone || ''} ${value.principalVia || ''} ${value.principalNameNumberVia || ''} ${value.principalLetter || ''} ${value.principalPrefixBis || ''} ${value.principalLetterPrefix || ''} ${value.secondaryVia || ''} ${value.secondaryNameNumberVia || ''} ${value.secondaryLetter || ''} ${value.secondarySuffixBis || ''} ${value.secondaryLetterSuffix || ''}`.toUpperCase());
    })

    this.httpClient.get(`${this.apiUrl}/select/url/Zona`).subscribe((res : any) => {
      this.optionsDirections.zone = res;
    });
    this.httpClient.get(`${this.apiUrl}/select/url/direccion-vias`).subscribe((res : any) => {
      this.optionsDirections.viaDirection = res;
    });
    this.httpClient.get(`${this.apiUrl}/select/url/direccion-letras`).subscribe((res : any) => {
      this.optionsDirections.letterDirection = res;
    });
  }

  saveAddress(){
    if(!this.addressForm.valid){
      this.addressForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.generateAddress.controls.address.value);
  }

}
