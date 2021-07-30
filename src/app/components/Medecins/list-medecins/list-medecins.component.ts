import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MedecinService} from 'src/app/core/services/medecin.service';
import { AuthenticationService } from '@app/core/auth/services';

@Component({
  selector: 'app-list-medecins',
  templateUrl: './list-medecins.component.html',
  styleUrls: ['./list-medecins.component.scss'],
})
export class ListMedecinsComponent implements OnInit {
  addButton;
  loggedUser;

  constructor(private medecinService: MedecinService, private authService: AuthenticationService) { }

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
    this.loggedUser = this.authService.getCurrentUser
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
