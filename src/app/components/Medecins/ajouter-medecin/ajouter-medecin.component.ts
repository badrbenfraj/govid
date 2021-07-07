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

  constructor(private medecinSer: MedecinService, private router: Router) {
  }

  ngOnInit(): void {
  }

  save(data) {
    if (data.cnamConvention = !true) {
      data.cnamConvention = false;
    }
    this.medecinSer.createMedecin(data).subscribe((result) => {
      this.router.navigateByUrl('/dashboard/medecin/list-medecin');
    });
    console.warn(data);
  }
}
