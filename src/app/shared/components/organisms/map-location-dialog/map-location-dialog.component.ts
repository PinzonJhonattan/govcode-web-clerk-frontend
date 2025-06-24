import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import proj4 from 'proj4';

@Component({
  selector: 'app-map-location-dialog',
  templateUrl: './map-location-dialog.component.html',
  styleUrls: ['./map-location-dialog.component.scss']
})
export class MapLocationDialogComponent implements OnInit {

  @ViewChild('leafletMapComponent') leafleatMapComponent : ElementRef;

  actualCoords : {lat : number, long : number} = null;
  constructor(private dialogRef: MatDialogRef<MapLocationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data?.locationCoords.lat !== '' && this.data?.locationCoords.long !== '') {
      // Métodos para transformacion de coordenadas
      proj4.defs("EPSG:9377", "+proj=tmerc +lat_0=4.0 +lon_0=-73.0 +k=0.9992 +x_0=5000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
      proj4.defs('WGS84', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
      const wgs84Projection = 'WGS84';
      const colombiaProjection = 'EPSG:9377';
      const pointInWGS84 = [this.data.locationCoords.long, this.data.locationCoords.lat];
      const [x, y] = proj4(colombiaProjection, wgs84Projection, pointInWGS84);

      this.data.locationCoords = { lat: y, long: x };
    }
  }

  coordSelected(coords){
    this.actualCoords = coords
  }

  selectCoords(){
    this.dialogRef.close(this.actualCoords)
  }
}
