import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig,Message } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {DialogModule, Dialog} from 'primeng/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { laboratoire } from '@app/core/models/laboratoire';
import { LaboratoireService } from '@app/core/services/laboratoire.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult = '';
  display: boolean = false;
  laboratoireForm:FormGroup;
  formData:any;
  bodyText:string="";
  showPopupButton:boolean=false;
  constructor(private router:Router,private modalService: NgbModal,private primengConfig: PrimeNGConfig,private confirmationService: ConfirmationService,private route:ActivatedRoute,private laboratoireService:LaboratoireService) { }

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

 removeLabo(content,laboratoire){
  this.showPopupButton=false;
  this.laboratoireService.removeLaboratoire(this.currentId.toString()).subscribe(res=>{
    this.bodyText="le laboratoire a été supprimé avec succees";

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.router.navigate(['/laboratoireHome']);

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  },err=>{
    this.bodyText="une erreur est apparue , le laboratoire ne peut pas etres supprimer"
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    console.log("result",result)
  
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  })
}

open(content) {
  this.showPopupButton=true;
  this.bodyText="Êtes-vous sûr de vouloir continuer?"
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  console.log("result",result)
  if(result=="Supprimer"){
    this.removeLabo(content,this.currentId);
  }
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}
