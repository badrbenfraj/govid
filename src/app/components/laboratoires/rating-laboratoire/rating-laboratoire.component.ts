import { Component, Input, OnInit } from '@angular/core';
import { laboratoire } from '@app/core/models/laboratoire';
import { LaboratoireService } from '@app/core/services/laboratoire.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-rating-laboratoire',
  templateUrl: './rating-laboratoire.component.html',
  styleUrls: ['./rating-laboratoire.component.scss'],
  providers: [NgbRatingConfig]
})
export class RatingLaboratoireComponent implements OnInit {
  currentRate = 0;
  @Input()currentLabo:laboratoire;
  newRating:any;
  constructor(private laboratoireService:LaboratoireService ,config: NgbRatingConfig) { config.max = 5; }

  ngOnInit(): void { 
   
  }
  rateChange(){
    this.currentLabo.totalReviews=this.currentLabo.totalReviews+1;

    console.log("change",((this.currentLabo.rating*this.currentLabo.totalReviews)+this.currentRate)/(this.currentLabo.totalReviews+1));
    //((Overall Rating * Total Rating) + new Rating) / (Total Rating + 1)
   this.newRating= ((this.currentLabo.rating*this.currentLabo.totalReviews)+this.currentRate)/(this.currentLabo.totalReviews+1);
 this.currentLabo.rating=Math.round(this.newRating)
 console.log("change",this.newRating);

   this.laboratoireService.updateLaboratoire(this.currentLabo.id,this.currentLabo).subscribe();
   //TODO set totalreviews to totalReviews+1
     //TODO set newRating to totalReviews+1
  }

}
