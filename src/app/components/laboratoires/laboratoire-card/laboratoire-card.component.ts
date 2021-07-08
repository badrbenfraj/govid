import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { laboratoire } from '@app/core/models/laboratoire';
import { LaboratoireService } from '@app/core/services/laboratoire.service';

@Component({
  selector: 'app-laboratoire-card',
  templateUrl: './laboratoire-card.component.html',
  styleUrls: ['./laboratoire-card.component.scss']
})
export class LaboratoireCardComponent implements OnInit {
@Input() laboratoire:laboratoire;
  constructor(private router:Router,private laboratoireService:LaboratoireService) { }
   
  ngOnInit(): void {
  }
  previewLabo(){
    localStorage.setItem('laboratoireUpdateMode', "false");
    this.router.navigate(['/laboratoireDashboard'],{queryParams:{
      id:this.laboratoire.id
    }})
  }
  openLocation(){
    this.router.navigate(['/laboratoireMap'],{queryParams:{
      idLocation:this.laboratoire.id
    }})
  }
  updateLabo(){
    localStorage.setItem('laboratoireUpdateMode', "true");
    this.router.navigate(['/laboratoireDashboard'],{queryParams:{
      id:this.laboratoire.id
    }})
  }
  removeLabo(){
    this.laboratoireService.removeLaboratoire(this.laboratoire.id.toString()).subscribe()
  }
}
