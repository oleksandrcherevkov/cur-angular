import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { BikeService } from '../shared/services/bike/bike.service';
import { StationService } from '../shared/services/station/station.service';
import { BehaviorSubject, delay, forkJoin, of, switchMap, tap } from 'rxjs';
import { gerRadius } from './map.functions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
  };
  zoom = 16;
  center = latLng(48.99397249327685, 36.31058503550048);
  map!: L.Map;
  markersLayer = new L.LayerGroup();
  sMarkersLayer!: L.LayerGroup;
  iconUrl = 'assets/marker-icon.png';
  shadowUrl = 'assets/marker-shadow.png';

  private updateMarkers$ = new BehaviorSubject<null>(null);

  constructor(private bikeService: BikeService, private stationService: StationService) {
  }

  ngOnInit(): void {
    this.updateMarkers$
      .pipe(
        switchMap(() => of(null).pipe(delay(1000))),
        switchMap(() =>
          forkJoin(
            this.bikeService.getAll(this.center.lng, this.center.lat, gerRadius(this.zoom)),
            this.stationService.getAll(this.center.lng, this.center.lat, gerRadius(this.zoom)),
          )
        ),
        tap(([bikes, stations]) => {
          if (this.sMarkersLayer) {
            this.markersLayer.removeLayer(this.sMarkersLayer);
          }
          this.sMarkersLayer = new L.LayerGroup();
          for (const s of stations) {
            const icon = new L.DivIcon({
              ...L.Icon.Default.prototype.options,
              html: `<img style="transform: scale(2)" src='${this.iconUrl}'/> <span>${s.name}</span>`,
            });
            const marker = L.marker([s.latitude, s.longtitude], { icon });
            this.sMarkersLayer.addLayer(marker);
            marker.bindPopup(`<b>Hello world!</b><br>I am a station.<br>My name is ${s.name}.<br>I have ${s.bikesCount} bikes.`).openPopup();
          }
          for (const b of bikes) {
            const icon = {
              icon: L.icon({
                ...L.Icon.Default.prototype.options,
                iconUrl: 'assets/marker-icon.png',
                iconRetinaUrl: 'assets/marker-icon-2x.png',
                shadowUrl: 'assets/marker-shadow.png'
              })
            };
            const marker = L.marker([b.latitude, b.longtitude], icon);
            this.sMarkersLayer.addLayer(marker);
          }
          this.markersLayer.addLayer(this.sMarkersLayer);
        }),
      ).subscribe();
  }

  updateMarkers() {
    this.updateMarkers$.next(null);
  }

  onMapReady(map: L.Map) {
    setTimeout(() => {
      map.invalidateSize();
      this.map = map;
      map.addLayer(this.markersLayer);
    }, 200);
  }
}
