import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from '@angular/material/dialog';
import {
  MapLocationDialogComponent
} from "@shared/components/organisms/map-location-dialog/map-location-dialog.component";
import {getErrorMessage} from "@shared/utils/getErrorMessage";

@Component({
  selector: 'app-input-location-map',
  templateUrl: './input-location-map.component.html',
  styleUrls: ['./input-location-map.component.scss'],
})
export class InputLocationMapComponent implements OnInit {

  @Input() fieldControl !: FormControl;
  @Input() label: string = "";
  @Input() name: string = "";
  @Input() description: string = ''
  @Input() readonly: boolean = false;

  locationForm: FormGroup;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.locationForm = new FormGroup<any>({
      lat: new FormControl('', [Validators.min(1080616.361318), Validators.max(3307327.960814)]),
      long : new FormControl('', [Validators.min(3685119.144520), Validators.max(5681293.093407)])
    });

    if (this.fieldControl.value) {
      const [lat, long] = this.fieldControl.value.split(',');
      this.locationForm.setValue({
        lat,
        long
      })
    }
    if (this.readonly && !this.fieldControl.value) {
      this.getUserLocationPosition()
    }

    this.locationForm.valueChanges.subscribe(data => {
      if (data.lat && data.long) {
        this.fieldControl.setValue(`${this.locationForm.get('lat').value},${this.locationForm.get('long').value}`)
      } else {
        this.fieldControl.setValue('');
        this.fieldControl.markAsTouched()
      }
    })
  }

  openMap() {
    const dialogRef = this.dialog.open(MapLocationDialogComponent, {
      width: '100%',
      data: {
        locationCoords: this.locationForm.value,
        readOnlyMap: this.readonly
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fieldControl.markAsTouched()
      if (result) {
        this.locationForm.setValue({
          lat: result.lat,
          long: result.long
        })
        this.fieldControl.setValue(`${result.lat},${result.long}`)
      }
    });
  }

  private getUserLocationPosition(): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        let actualPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        this.locationForm.setValue({
          lat: actualPosition.latitude,
          long: actualPosition.longitude
        })
        this.fieldControl.setValue(`${actualPosition.latitude},${actualPosition.longitude}`)
      });
    }
  }

  protected readonly getErrorMessage = getErrorMessage;
  protected readonly Validators = Validators;
}
