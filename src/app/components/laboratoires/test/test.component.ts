import { Component, OnInit } from '@angular/core';
import { LaboratoireService } from 'src/app/services/laboratoire.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private laboratoireService:LaboratoireService) { }

  ngOnInit(): void {
    this.laboratoireService.getAllLaboratoires().subscribe(res=>{
    })
  }

}
