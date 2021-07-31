import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LaboratoireService } from '@app/core/services/laboratoire.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  advancedOpened:boolean=false;
  laboratoireForm:FormGroup;

  constructor(private laboratoireService:LaboratoireService) { }

  ngOnInit(): void {
    this.createForm();
  }
  openAdvanced(){
    this.advancedOpened=true;
  }
  closeAdvanced(){
    this.advancedOpened=false;
  }
  createForm(){
    this.laboratoireForm= new FormGroup({
      name : new FormControl("",Validators.required),
      address : new FormControl("",Validators.required),
      workingTime:new FormControl("",Validators.required),
      updateDate:new FormControl("",Validators.required),
    })
  }

}
