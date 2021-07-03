import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { laboratoire } from 'src/app/core/models/laboratoire';

@Component({
  selector: 'app-laboratoire-card',
  templateUrl: './laboratoire-card.component.html',
  styleUrls: ['./laboratoire-card.component.scss']
})
export class LaboratoireCardComponent implements OnInit {
@Input() laboratoire: laboratoire;
  constructor(private router: Router) { }
   
  ngOnInit(): void {
  }
  previewLabo(){
    localStorage.setItem('laboratoireUpdateMode', 'false');
    this.router.navigate(['/laboratoireDashboard'], {queryParams: {
      id: this.laboratoire.id
    }});
  }
  updateLabo(){
    localStorage.setItem('laboratoireUpdateMode', 'true');
    this.router.navigate(['/laboratoireDashboard'], {queryParams: {
      id: this.laboratoire.id
    }});
  }
}
