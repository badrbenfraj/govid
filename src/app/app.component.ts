import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showModifyButton:boolean=false;
}

