import {Component, Input, OnInit} from '@angular/core';
import {MedecinService} from 'src/app/core/services/medecin.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MedecinInput} from '@app/core/models/medecinInput';
import {Router} from '@angular/router';
import { AuthenticationService } from '@app/core/auth/services';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() medecin: any;
  closeModal: string;
  medecinToUpdate: MedecinInput;
  likes: 0;
  disLike:0
  loggedUser;

  constructor(private medecinService: MedecinService, private modalService: NgbModal, private router: Router, private authService: AuthenticationService) {
  }

  id: string;

  ngOnInit(): void {
    this.loggedUser = this.authService.getCurrentUser
  }

  deleteMedecin(id: number) {
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
      return `with: ${reason}`;
    }
  }

  edit(medecin): void {
    this.medecinToUpdate = medecin;
  }

  updateMedecin(): void {
    this.medecinService.updateMedecin(this.medecinToUpdate.id, this.medecinToUpdate).subscribe();
    window.location.reload();
  }

  public LikesCounter(medecin)
  {
    medecin.likes++;
  }

  public DisLikesCounter(medecin)
  {
    medecin.disLike++;
  }

}

