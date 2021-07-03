import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { laboratoire } from 'src/app/models/laboratoire';

@Component({
  selector: 'app-laboratoire-map',
  templateUrl: './laboratoire-map.component.html',
  styleUrls: ['./laboratoire-map.component.scss']
})
export class LaboratoireMapComponent implements OnInit {



@Input()laboratoire:laboratoire;
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  
  @ViewChild('search')
  public searchElementRef: ElementRef;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }
  
  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }
  
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log("latitude",this.latitude,"longitude",this.longitude)
        this.zoom = 8;
        this.getAddress(this.laboratoire.latitude, this.laboratoire.longitude);
      });
    }
  }
  
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    

})}

}
