import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {
  Map,
  MapOptions,
  tileLayer,
  latLng,
  icon,
  Marker,
} from 'leaflet';
import {Observable, Subscriber} from "rxjs";
import proj4 from 'proj4';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, OnDestroy {
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Output() coordSelected: EventEmitter<{lat : number, long : number}> = new EventEmitter;

  @Input() options: MapOptions;
  @Input() readonly : boolean = false;
  @Input() initCoords : any;

  public map: Map;
  public zoom: number;
  private actualMarker;
  private currentPositionUser : any;

  constructor() {
  }

  ngOnInit() {
    this.initializeMapOptions();

    proj4.defs("EPSG:9377", "+proj=tmerc +lat_0=4.0 +lon_0=-73.0 +k=0.9992 +x_0=5000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
    proj4.defs('WGS84', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
  }

  transformCoordinates(lat: number, long: number): { lat: number, long: number } | null {
    if (lat && long) {
      const wgs84Projection = 'WGS84';
      const colombiaProjection = 'EPSG:9377'; // Origen Nacional
      const pointInWGS84 = [long, lat];
      const [x, y] = proj4(wgs84Projection, colombiaProjection, pointInWGS84);

      return { lat: y, long: x };
    }
    return null;
  }

  ngOnDestroy() {
    this.map.off()
  };

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          let actualPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          this.currentPositionUser = actualPosition;
          observer.next(actualPosition);
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);

    if(this.initCoords.lat && this.initCoords.long){
      this.map.panTo([this.initCoords?.lat, this.initCoords?.long]);
      this.addSampleMarker(this.initCoords?.lat, this.initCoords?.long)
    }else{
      this.getCurrentPositionUser()
    }
  }

  onMapZoomEnd(e: any) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

  initializeMapOptions() {
    if (this.map) {
      this.map.remove()
    }
    this.options = {
      layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 1,
        maxZoom: 19,
        minZoom : 2,
        attribution: 'Mapa Interactivo'
      })],
      zoom: 17,
      center: latLng(4.60971, -74.08175)
    };
  }

  private addSampleMarker(lat, long) {
    const marker = new Marker([lat, long])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/img/marker-icon.png'
        }));
    if (this.actualMarker) {
      this.map.removeLayer(this.actualMarker);
    }
    marker.addTo(this.map).bindPopup(`Lat ${lat}, Long ${long}`);
    this.actualMarker = marker;
  }

  public clickOnMap(event) {
    if(!this.readonly){
      const transformCoordinates = this.transformCoordinates(event.latlng.lat, event.latlng.lng);
      this.addSampleMarker(event.latlng.lat, event.latlng.lng);
      this.coordSelected.emit(transformCoordinates)
    }
  }

  public changeToCurrentLocationUser(){
    if(!this.currentPositionUser){
      this.getCurrentPositionUser();
    }else{
      this.addSampleMarker(this.currentPositionUser.latitude, this.currentPositionUser.longitude)
      this.map.panTo([this.currentPositionUser.latitude, this.currentPositionUser.longitude]);

      const transformCoordinates = this.transformCoordinates(this.currentPositionUser.latitude, this.currentPositionUser.longitude);
      this.coordSelected.emit(transformCoordinates)
    }
  }

  public getCurrentPositionUser(){
    this.getCurrentPosition()
      .subscribe((position: any) => {
        this.map.panTo([position.latitude, position.longitude]);
        const transformCoordinates = this.transformCoordinates(position.latitude, position.longitude);
        this.addSampleMarker(position.latitude, position.longitude)
        this.coordSelected.emit(transformCoordinates)
      });
  }
}
