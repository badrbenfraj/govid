
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { ActivatedRoute } from '@angular/router';
import { laboratoire } from '@app/core/models/laboratoire';
import {Role} from '@auth/models';
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
  private geoCoder;y
  @ViewChild('search')
  public searchElementRef: ElementRef;
  currentId: any;
  cancelButton: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private route:ActivatedRoute
  ) { }


  ngOnInit() {
    this.cancelButton = {
      label: 'Cancel',
      path: `/dashboard/laboratoire`,
      icon: 'fas fa-undo',
      roles: [Role.Admin, Role.agentLabo, Role.agentMedecin, Role.agentPhamacy, Role.User]
    }
    this.route.queryParams.subscribe(params =>{
      this.currentId=params['idLocation'];})
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }

    });
  }

}
