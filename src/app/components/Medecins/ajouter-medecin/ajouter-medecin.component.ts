import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MedecinInput} from 'src/app/core/models/medecinInput';
import {MedecinService} from 'src/app/core/services/medecin.service';


@Component({
  selector: 'app-ajouter-medecin',
  templateUrl: './ajouter-medecin.component.html',
  styleUrls: ['./ajouter-medecin.component.scss']
})
export class AjouterMedecinComponent implements OnInit {
  med: MedecinInput;
  cancelButton;

  constructor(private medecinSer: MedecinService, private router: Router) {
  }

  ngOnInit(): void {
    this.cancelButton = {
      path: '/dashboard/medecin/list-medecin',
      label: 'Annuler',
      icon: 'fas fa-undo'
    };
  }

  save(data) {
    this.medecinSer.createMedecin(data).subscribe((result) => {
      this.router.navigateByUrl('/dashboard/medecin/list-medecin');
    });
  }
}
