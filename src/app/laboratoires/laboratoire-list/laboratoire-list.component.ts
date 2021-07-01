import { Component, OnInit } from '@angular/core';
import { LaboratoireService } from 'src/app/services/laboratoire.service';

@Component({
  selector: 'app-laboratoire-list',
  templateUrl: './laboratoire-list.component.html',
  styleUrls: ['./laboratoire-list.component.scss']
})
export class LaboratoireListComponent implements OnInit {
laboratoiresList:any[]=[];

  constructor(private laboratoireService:LaboratoireService) { }
  async ngOnInit(): Promise<void> {
    this.laboratoiresList=await this.laboratoireService.getAllLaboratoires().toPromise();
  console.log("nouha",this.laboratoiresList)
  }

}
