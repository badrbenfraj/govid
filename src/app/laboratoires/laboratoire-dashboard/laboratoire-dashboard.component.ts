import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laboratoire-dashboard',
  templateUrl: './laboratoire-dashboard.component.html',
  styleUrls: ['./laboratoire-dashboard.component.scss']
})
export class LaboratoireDashboardComponent implements OnInit {
  showModifyButton:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }

}
