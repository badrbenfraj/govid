import {Component, OnInit} from '@angular/core';
import {MedecinService} from 'src/app/core/services/medecin.service';

@Component({
  selector: 'app-list-medecins',
  templateUrl: './list-medecins.component.html',
  styleUrls: ['./list-medecins.component.scss'],
})
export class ListMedecinsComponent implements OnInit {
  addButton;

  constructor(private medecinService: MedecinService) { }

  listMedecin: any[] = [];
  listMedecinFiltred: any[] = [];

  ngOnInit(): void {
    this.addButton = {
      label: 'Ajouter médecin',
      path: '/dashboard/medecin/new',
      icon: 'fas fa-user-plus',
    };
    this.medecinService.getAllMedecins().subscribe((res) => {
      this.listMedecin = res;
    });
  }

  filtrer(fullName, email, phoneNumber, speciality, gender, cnamConvention) {
    this.listMedecinFiltred = this.listMedecin.filter((medecin) => {
      return (
        medecin.fullName == fullName ||
        medecin.email == email ||
        medecin.phoneNumber == phoneNumber ||
        medecin.speciality == speciality ||
        medecin.gender == gender ||
        medecin.cnamConvention == cnamConvention
      );
    });
  }
}
