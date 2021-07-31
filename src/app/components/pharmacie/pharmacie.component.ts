import {Component, OnInit} from '@angular/core';
import {PharmacieService} from '@services/pharmacie.service';
import {Pharmacie} from '@models/pharmacie';

@Component({
  selector: 'app-pharmacie',
  templateUrl: './pharmacie.component.html',
  styleUrls: ['./pharmacie.component.scss']
})
export class PharmacieComponent implements OnInit {
  buttonAdd: any;
  pharmacies: Pharmacie[] = [];

  constructor(private pharmacieService: PharmacieService) {
  }

  ngOnInit(): void {
    this.buttonAdd = {
      label: 'Ajouter',
      path: '/dashboard/pharmacie/new',
      icon: 'fas fa-user-plus',
      roles: ['ROLE_USER']
    };
    this.getPharmacies();
  }

  getPharmacies(): void {
    this.pharmacieService.getPharmacies().subscribe(data => this.pharmacies = data);
  }

  delete(id: number): void {
    this.pharmacieService.delete(id).subscribe();
    this.getPharmacies();
  }

}
