import { Component, OnInit } from '@angular/core';
import { laboratoire } from '@app/core/models/laboratoire';
import { LaboratoireService } from '@app/core/services/laboratoire.service';

@Component({
  selector: 'app-add-labo',
  templateUrl: './add-labo.component.html',
  styleUrls: ['./add-labo.component.scss']
})
export class AddLaboComponent implements OnInit {
  formData: laboratoire = {
    id:null,
    name: null,
    phoneNumber: null,
    adresse: null,
    updateDate: null,
    email: null,
    gouvernorat:null,
    fax:null,
    workingTime:null,
    rating:null,
    latitude:null,
    longitude:null,
    totalReviews:null

  }
  workingTimes = [
    {name: 'plein temps'},
    {name: 'temps partiel'},
    
  ];
  constructor(private laboratoireService:LaboratoireService) { }

  ngOnInit(): void {
  }
  
  addLabo(){
    delete this.formData.id;
    this.formData.updateDate=new Date();
    this.formData.rating=0;
    this.formData.totalReviews=0;
   
    this.laboratoireService.createLaboratoire(this.formData).subscribe()
  }
}
