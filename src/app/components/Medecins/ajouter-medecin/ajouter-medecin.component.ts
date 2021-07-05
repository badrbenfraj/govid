import { Component, OnInit } from '@angular/core';
import { MedecinInput } from 'src/app/core/models/medecinInput';
import { MedecinService } from 'src/app/core/services/medecin.service';


@Component({
  selector: 'app-ajouter-medecin',
  templateUrl: './ajouter-medecin.component.html',
  styleUrls: ['./ajouter-medecin.component.scss']
})
export class AjouterMedecinComponent implements OnInit {
 med: MedecinInput;
  constructor(private medecinSer: MedecinService) { }

  ngOnInit(): void {
    this.med = new MedecinInput();
  }

  save(){
this.medecinSer.createMedecin(this.med).subscribe();
  }

}
