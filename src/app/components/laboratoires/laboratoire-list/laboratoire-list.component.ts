import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LaboratoireService } from '@app/core/services/laboratoire.service';

@Component({
  selector: 'app-laboratoire-list',
  templateUrl: './laboratoire-list.component.html',
  styleUrls: ['./laboratoire-list.component.scss']
})
export class LaboratoireListComponent implements OnInit {
laboratoiresList:any[]=[];
workingTimes = [
  {name: 'Plein temps'},
  {name: 'Temps partiel'},
  
];
listLaboFiltred:any[]=[];
showSpinner:boolean=true;
listLaboAux:any[]=[];
advancedOpened:boolean=false;
laboratoireForm:FormGroup;
@Input() sortField;
  constructor(private laboratoireService:LaboratoireService) { }
   ngOnInit() {
    this.showSpinner=true
    this.createForm();
     this.laboratoireService.getAllLaboratoires().subscribe(res=>{
       this.laboratoiresList=res;
       this.listLaboAux=this.laboratoiresList;

      this.showSpinner=false;
     })
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
      email : new FormControl("",Validators.required),
      workingTime:new FormControl("",Validators.required),
      updateDate:new FormControl("",Validators.required),
      phoneNumber:new FormControl("",Validators.required),
      gouvernorat:new FormControl("",Validators.required),
    })
  }
  search(){
    this.listLaboFiltred = this.laboratoiresList.filter((labo) => {
      return (labo["name"] == this.laboratoireForm.controls["name"].value ||labo["gouvernorat"] == this.laboratoireForm.controls["gouvernorat"].value|| labo["email"] == this.laboratoireForm.controls["email"].value || labo["phoneNumber"] == this.laboratoireForm.controls["phoneNumber"].value

      || labo["workingTime"] == this.laboratoireForm.controls["workingTime"].value )
    })
    this.laboratoiresList=this.listLaboFiltred
  }
  ngOnChanges(changes: SimpleChanges) {
    this.sortList(changes.sortField.currentValue);
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values
    
}
  sortList(param: any) {
    if(param.toString().toLowerCase()=="nom"){
   let sorted=   this.laboratoiresList.sort((t1, t2) => {
        const name1 = t1.name.toLowerCase();
        const name2 = t2.name.toLowerCase();
        if (name1 > name2) { return 1; }
        if (name1 < name2) { return -1; }
        return 0;
      });
    }
    else if(param.toString().toLowerCase()=="date de modification"){
      let sorted=   this.laboratoiresList.sort((t1, t2) => {
           const name1 = t1.updateDate.toLowerCase();
           const name2 = t2.updateDate.toLowerCase();
           if (name1 > name2) { return 1; }
           if (name1 < name2) { return -1; }
           return 0;
         });
       }
       else{
     
          let sorted=   this.laboratoiresList.sort((t1, t2) => {
               const name1 = t1.rating;
               const name2 = t2.rating;
               if (name1 > name2) { return 1; }
               if (name1 < name2) { return -1; }
               return 0;
             });
       }
    
  }
  deleteFilter(){
    this.laboratoiresList=this.listLaboAux;
    this.laboratoireForm.controls["name"].reset();
    this.laboratoireForm.controls["workingTime"].reset();
    this.laboratoireForm.controls["updateDate"].reset();
    this.laboratoireForm.controls["phoneNumber"].reset();
    this.laboratoireForm.controls["email"].reset();
    this.laboratoireForm.controls["gouvernorat"].reset();
  }
  
}
