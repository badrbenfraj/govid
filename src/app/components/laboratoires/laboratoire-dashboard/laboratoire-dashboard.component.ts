import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeNGConfig,Message } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {DialogModule, Dialog} from 'primeng/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { laboratoire } from '@app/core/models/laboratoire';
import { LaboratoireService } from '@app/core/services/laboratoire.service';
@Component({
  selector: 'app-laboratoire-dashboard',
  templateUrl: './laboratoire-dashboard.component.html',
  styleUrls: ['./laboratoire-dashboard.component.scss'],
  providers: [ConfirmationService]
})
export class LaboratoireDashboardComponent implements OnInit {
  workingTimes = [
    {name: 'plein temps'},
    {name: 'temps partiel'},
    
  ];
  showModifyButton:boolean=true;
  currentId:any;
  name;
  disabled:boolean=true;
  currentLabo:laboratoire;
  msgs: Message[] = [];
  display: boolean = false;
  laboratoireForm:FormGroup;
  formData:any;
  constructor(private primengConfig: PrimeNGConfig,private confirmationService: ConfirmationService,private route:ActivatedRoute,private laboratoireService:LaboratoireService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.route.queryParams.subscribe(params =>{
    this.currentId=params['id'];})
    this.createForm();
this.laboratoireService.getLaboratoireByIdentifier(this.currentId).subscribe(res=>{
  this.currentLabo=res;
  this.formData=res
  console.log("reeeees",res);
  this.fillForm();
})

if(localStorage.getItem('laboratoireUpdateMode')=="true"){
  this.showModifyButton=true;
  this.disabled=false;
}else{
  console.log("laboratoireUpdateMode false");
  this.showModifyButton=false;
  this.disabled=true;

}
    
  }
  fillForm(){
    this.laboratoireForm.controls["name"].setValue(this.currentLabo.name);
    this.laboratoireForm.controls["mail"].setValue(this.currentLabo.email);
    this.laboratoireForm.controls["tel"].setValue(this.currentLabo.phoneNumber);
    this.laboratoireForm.controls["fax"].setValue(this.currentLabo.fax);
    this.laboratoireForm.controls["address"].setValue(this.currentLabo.adresse);
    this.laboratoireForm.controls["workingTime"].setValue(this.currentLabo.workingTime);
    this.laboratoireForm.controls["updateDate"].setValue(this.currentLabo.updateDate);

  }
  showDialog() {
    this.display = true;
}
 createForm(){
   this.laboratoireForm= new FormGroup({
     name : new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
     mail : new FormControl("",Validators.required),
     tel : new FormControl("",Validators.pattern("[0-9 ]{12}")),
     fax : new FormControl("",Validators.required),
     address : new FormControl("",Validators.required),
     workingTime:new FormControl(""),
     updateDate:new FormControl("",Validators.required),



   })
 }
  confirm(event: Event) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir continuer?',
      header: 'Confirmation',
    //  icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.laboratoireService.removeLaboratoire(this.currentId).subscribe(res=>{
      
          this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];

        },err=>{
          this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];

        })
        
      },
    /*  reject: () => {
          this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }*/
  });
  /*  this.confirmationService.confirm({
        target: event.target,
        message: 'Êtes-vous sûr de vouloir continuer?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.laboratoireService.removeLaboratoire(this.currentId).subscribe(res=>{
      
            this.messageService.add({
              severity: "info",
              summary: "Confirmed",
              detail: "You have accepted"
            });
          },err=>{
            this.messageService.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected"
            });
          })
        },
      /*  reject: () => {

            //reject action
            this.messageService.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected"
            });
        }
    });*/
}

}
