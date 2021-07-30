import { Component, OnInit } from '@angular/core';
import { PharmacieService } from '@app/components/pharmacie/pharmacie.service';
import { Pharmacie } from '../pharmacie';


@Component({
  selector: 'app-pharmacie-search',
  templateUrl: './pharmacie-search.component.html',
  styleUrls: ['./pharmacie-search.component.scss']
})
export class PharmacieSearchComponent implements OnInit {
  pharmacies: Pharmacie[];
  constructor(private service: PharmacieService) { }
  
  ngOnInit(): void {
  }
  getPharmacies(): void {
    this.service.getPharmacies()
      .subscribe(pharmacies => this.pharmacies = pharmacies);
  }
}
