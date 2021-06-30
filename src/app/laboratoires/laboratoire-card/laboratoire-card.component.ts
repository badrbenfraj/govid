import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { laboratoire } from 'src/app/models/laboratoire';

@Component({
  selector: 'app-laboratoire-card',
  templateUrl: './laboratoire-card.component.html',
  styleUrls: ['./laboratoire-card.component.scss']
})
export class LaboratoireCardComponent implements OnInit {
@Input() laboratoire:laboratoire;
  constructor(private router:Router) { }
   
  ngOnInit(): void {
  }
  previewLabo(){
    this.router.navigateByUrl('/laboratoireDashboard')
  }
}
