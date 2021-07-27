import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { laboratoire } from '@app/core/models/laboratoire';
import { LaboratoireService } from '@app/core/services/laboratoire.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-labo',
  templateUrl: './add-labo.component.html',
  styleUrls: ['./add-labo.component.scss']
})
export class AddLaboComponent implements OnInit {
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
  @Output() closeDialog = new EventEmitter<any>();
showPopupButton:boolean=true;
bodyText:string=""
  workingTimes = [
    {name: 'Plein temps'},
    {name: 'Temps partiel'},
    
  ];
  closeResult = '';
  constructor(private router:Router,private modalService: NgbModal,private laboratoireService:LaboratoireService) { }

  ngOnInit(): void {
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
  addLabo(content){
    delete this.formData.id;
    this.formData.updateDate=new Date();
    this.formData.rating=0;
    this.formData.totalReviews=0;
   
    this.laboratoireService.createLaboratoire(this.formData).subscribe(res=>{
      document.getElementById("formId").outerHTML="";
      this.closeDialog.emit(true)
      this.showPopupButton=false;

      this.bodyText="le laboratoire a été ajouté avec succees"
     
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log("result",result)
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    },err=>{
      this.closeDialog.emit(true)
      this.showPopupButton=false;
      this.bodyText="une erreur est apparue , le laboratoire ne peut pas etres ajouté"
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log("result",result)
    
      }, (reason) => {

        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    })
  }
 
}
