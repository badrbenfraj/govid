import {Component, Input, OnInit} from '@angular/core';
import {MedecinService} from 'src/app/core/services/medecin.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() medecin: any;
  closeModal: string;
  medecinToUpdate ={

    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
    speciality: "",
    gender: "",
    cnamConvention: ""

  };

  constructor(private medecinService: MedecinService, private modalService: NgbModal) {
  }

  id: string;

  ngOnInit(): void {

  }

  deleteMedecin(id: string) {
    this.medecinService.removeMedecin(id).subscribe();
    window.location.reload();
  }

  triggerModal(content) {
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

  edit(medecin)
{
    this.medecinToUpdate = medecin;
}

}

