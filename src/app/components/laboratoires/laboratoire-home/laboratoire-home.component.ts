import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { LaboratoireService } from '@app/core/services/laboratoire.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-laboratoire-home',
  templateUrl: './laboratoire-home.component.html',
  styleUrls: ['./laboratoire-home.component.scss']
})
export class LaboratoireHomeComponent implements OnInit {
  listView:boolean=false;
  cardView:boolean=true;
  showAddLabo:boolean=false;
  sortField:any;
  laboratoiresList:any[]=[];
  workingTimes = [
    {name: 'plein temps'},
    {name: 'temps partiel'},
    
  ];
  listLaboFiltred:any[]=[];
  showSpinner:boolean=true;
  listLaboAux:any[]=[];
  advancedOpened:boolean=false;
  laboratoireForm:FormGroup;
    constructor(private laboratoireService:LaboratoireService) { }
     ngOnInit() {
      this.showSpinner=true
      this.createForm();
       this.laboratoireService.getAllLaboratoires().subscribe(res=>{
         this.laboratoiresList=res;
         this.listLaboAux=this.laboratoiresList;
  
        this.showSpinner=false;
       })
    console.log("nouha",this.laboratoiresList)
  
    }
    sortList(param: any) {
      console.log("sortparam",param)
      if(param.toString().toLowerCase()=="nom"){
     let sorted=   this.laboratoiresList.sort((t1, t2) => {
          const name1 = t1.name.toLowerCase();
          const name2 = t2.name.toLowerCase();
          if (name1 > name2) { return 1; }
          if (name1 < name2) { return -1; }
          return 0;
        });
        console.log("sorted",sorted)
      }
      else if(param.toString().toLowerCase()=="date de modification"){
        let sorted=   this.laboratoiresList.sort((t1, t2) => {
             const name1 = t1.updateDate.toLowerCase();
             const name2 = t2.updateDate.toLowerCase();
             if (name1 > name2) { return 1; }
             if (name1 < name2) { return -1; }
             return 0;
           });
           console.log("sorted",sorted)
         }
         else{
       
            let sorted=   this.laboratoiresList.sort((t1, t2) => {
                 const name1 = t1.rating;
                 const name2 = t2.rating;
                 if (name1 > name2) { return 1; }
                 if (name1 < name2) { return -1; }
                 return 0;
               });
               console.log("sorted",sorted)
             
         }
      
    }
    showAdd(){
      
      this.listView=false;
      this.cardView=false;
      this.showAddLabo=true;
    }
    showList(){
      
      this.listView=true;
      this.cardView=false;
      this.showAddLabo=false;
    }
    trier(){
      console.log("trier",this.sortField);
      if(this.listView){
        this.sortList(this.sortField)
      }

    }
    showCard(){
        
      this.listView=false;
      this.cardView=true;
      this.showAddLabo=false;
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
      console.log("name",this.listLaboFiltred,this.laboratoireForm.controls["name"].value)
      this.laboratoiresList=this.listLaboFiltred
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