import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { GoogleMapsModule } from '@angular/google-maps'

@Component({
  selector: 'app-map',
  standalone: true, 
  imports: [FormsModule, CommonModule, GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  
  @Input() mapLocation: any;

  mapOptions: google.maps.MapOptions;
  markers: any[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.mapOptions !== null && this.mapOptions !== undefined) {
      this.mapOptions = {
        center: { "lat": this.mapLocation.lat, "lng": this.mapLocation.lng },
        zoom : 14
      }
    }
    else {
      this.mapOptions = {
        center: { "lat": 43.6429251, "lng": -79.3741862 },
        zoom : 14
      }
    }
    this.buildMarkers(this.mapOptions);
  }

  ngOnChanges(): void {
    if (this.mapOptions !== null && this.mapOptions !== undefined) {
      this.mapOptions = {
        center: { "lat": this.mapLocation.lat, "lng": this.mapLocation.lng },
        zoom : 14
      }
    }
    else {
      this.mapOptions = {
        center: { "lat": 43.6429251, "lng": -79.3741862 },
        zoom : 14
      }
    }
    this.buildMarkers(this.mapOptions);
  }

  buildMarkers(mapOptions) {
    this.markers = [
      {
        position: new google.maps.LatLng(mapOptions.center.lat, mapOptions.center.lng),
        title: "Marker 1"
      }
    ]
  }
}
