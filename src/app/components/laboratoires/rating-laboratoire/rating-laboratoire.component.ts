import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-rating-laboratoire',
  templateUrl: './rating-laboratoire.component.html',
  styleUrls: ['./rating-laboratoire.component.scss'],
  providers: [NgbRatingConfig]
})
export class RatingLaboratoireComponent implements OnInit {
  currentRate = 0;

  constructor(config: NgbRatingConfig) { config.max = 5; }

  ngOnInit(): void { 
   
  }

}
