import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MedecinInput } from 'src/app/core/models/medecinInput';
import { MedecinService } from 'src/app/core/services/medecin.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
@Input() medecin: any;
  constructor(private medecinService: MedecinService) { }
  id: string;
  ngOnInit(): void {
    
    }

    deleteMedecin(id: string) {
 this.medecinService.removeMedecin(id).subscribe();
      }
  }

