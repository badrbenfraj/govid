import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  advancedOpened:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  openAdvanced(){
    this.advancedOpened=true;
  }
  closeAdvanced(){
    this.advancedOpened=false;
  }
}
