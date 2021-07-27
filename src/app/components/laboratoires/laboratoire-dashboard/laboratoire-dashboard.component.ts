import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
 
  @ViewChild('modalData') modalData: ElementRef; workingTimes = [
    {name: 'plein temps'},
    {name: 'temps partiel'},
    
  ];
  showModifyButton:boolean=true;
  currentId:any;
  name;
  disabled:boolean=true;
  currentLabo:laboratoire;
  msgs: Message[] = [];
  updatePopUp:boolean=false;
  closeResult = '';
  display: boolean = false;
  updateOK:boolean=false;
  laboratoireForm:FormGroup;
  bodyText:string="";
  showPopupButton:boolean=false;
  closeModal: string;
  formData: laboratoire = {
    id:null,
    name: null,
    phoneNumber: null,
    adresse: null,
    updateDate: null,
    email: null,
    gouvernorat:null,
    fax:null,
    workingTime:null,
    rating:null,
    latitude:null,
    longitude:null,
    totalReviews:null

  }

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
    this.laboratoireForm.controls["gouvernorat"].setValue(this.currentLabo.gouvernorat);

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
     gouvernorat : new FormControl("",Validators.required),
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


triggerModal(content) {
  this.updatePopUp=false;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });
}

triggerModalUpdate(content) {
  this.updatePopUp=true;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
modifierLabo(){
  this.formData.id=this.currentLabo.id;
  console.log("modif", this.laboratoireForm.controls["name"].value,this.formData.name,this.formData.gouvernorat)
  this.formData.updateDate=new Date();
  this.formData.rating=0;
  this.formData.totalReviews=0;
  this.laboratoireService.updateLaboratoire(this.currentId,this.formData).subscribe(res=>{
  this.updatePopUp=true;
  this.updateOK=true;
    this.triggerModalUpdate(this.modalData)
  },err=>{
    this.updatePopUp=true;
    this.updateOK=false;
      this.triggerModalUpdate(this.modalData)
  })
}
}
