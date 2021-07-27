import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators,} from '@angular/forms';
import {Router} from '@angular/router';
import {LaboratoireService} from '@app/core/services/laboratoire.service';
import {of} from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-laboratoire-home',
  templateUrl: './laboratoire-home.component.html',
  styleUrls: ['./laboratoire-home.component.scss']
})
export class LaboratoireHomeComponent implements OnInit {
  listView: boolean = false;
  cardView: boolean = true;
  showAddLabo: boolean = false;
  sortField: any;
  laboratoiresList: any[] = [];
  workingTimes = [
    {name: 'Plein temps'},
    {name: 'Temps partiel'},

  ];
  afterAddCalled: boolean = false;
  listLaboFiltred: any[] = [];
  showSpinner: boolean = true;
  listLaboAux: any[] = [];
  advancedOpened: boolean = false;
  laboratoireForm: FormGroup;
  closeResult = '';
  closeModal: string;
  laboToDel: any;
  bodyText: string = '';
  addMessage: string = '';
  showPopupButton: boolean = false;

  constructor(private modalService: NgbModal, private router: Router, private laboratoireService: LaboratoireService) {
  }

  ngOnInit() {
    this.showSpinner = true;
    this.createForm();
    this.laboratoireService.getAllLaboratoires().subscribe(res => {
      this.laboratoiresList = res;
      this.listLaboAux = this.laboratoiresList;

      this.showSpinner = false;
    });

  }

  sortList(param: any) {
    if (param.toString().toLowerCase() == 'nom') {
      let sorted = this.laboratoiresList.sort((t1, t2) => {
        const name1 = t1.name.toLowerCase();
        const name2 = t2.name.toLowerCase();
        if (name1 > name2) {
          return 1;
        }
        if (name1 < name2) {
          return -1;
        }
        return 0;
      });
    } else if (param.toString().toLowerCase() == 'date de modification') {
      let sorted = this.laboratoiresList.sort((t1, t2) => {
        const name1 = t1.updateDate.toLowerCase();
        const name2 = t2.updateDate.toLowerCase();
        if (name1 > name2) {
          return 1;
        }
        if (name1 < name2) {
          return -1;
        }
        return 0;
      });
    } else {

      let sorted = this.laboratoiresList.sort((t1, t2) => {
        const name1 = t1.rating;
        const name2 = t2.rating;
        if (name1 > name2) {
          return 1;
        }
        if (name1 < name2) {
          return -1;
        }
        return 0;
      });
    }

  }

  showAdd() {

    this.listView = false;
    this.cardView = false;
    this.showAddLabo = true;
  }

  showList() {

    this.listView = true;
    this.cardView = false;
    this.showAddLabo = false;
  }

  trier() {
    if (this.listView) {
      this.sortList(this.sortField);
    }

  }

  showCard() {

    this.listView = false;
    this.cardView = true;
    this.showAddLabo = false;
  }

  openAdvanced() {
    this.advancedOpened = true;
  }

  closeAdvanced() {
    this.advancedOpened = false;
  }

  createForm() {
    this.laboratoireForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      workingTime: new FormControl('', Validators.required),
      updateDate: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      gouvernorat: new FormControl('', Validators.required),
    });
  }

  search() {
    this.listLaboFiltred = this.laboratoiresList.filter((labo) => {
      return (labo['name'] == this.laboratoireForm.controls['name'].value || labo['gouvernorat'] == this.laboratoireForm.controls['gouvernorat'].value || labo['email'] == this.laboratoireForm.controls['email'].value || labo['phoneNumber'] == this.laboratoireForm.controls['phoneNumber'].value

        || labo['workingTime'] == this.laboratoireForm.controls['workingTime'].value);
    });
    this.laboratoiresList = this.listLaboFiltred;
  }

  deleteFilter() {
    this.laboratoiresList = this.listLaboAux;
    this.laboratoireForm.controls['name'].reset();
    this.laboratoireForm.controls['workingTime'].reset();
    this.laboratoireForm.controls['updateDate'].reset();
    this.laboratoireForm.controls['phoneNumber'].reset();
    this.laboratoireForm.controls['email'].reset();
    this.laboratoireForm.controls['gouvernorat'].reset();
  }

  previewLabo(laboratoire) {
    localStorage.setItem('laboratoireUpdateMode', 'false');
    this.router.navigate(['/laboratoireDashboard'], {
      queryParams: {
        id: laboratoire.id
      }
    });
  }

  openLocation(laboratoire) {
    this.router.navigate(['/laboratoireMap'], {
      queryParams: {
        idLocation: laboratoire.id
      }
    });
  }

  updateLabo(laboratoire) {
    localStorage.setItem('laboratoireUpdateMode', 'true');
    this.router.navigate(['/laboratoireDashboard'], {
      queryParams: {
        id: laboratoire.id
      }
    });
  }

  removeLabo(content, laboratoire) {
    this.showPopupButton = false;
    this.laboratoireService.removeLaboratoire(laboratoire.id.toString()).subscribe(res => {
      this.bodyText = 'le laboratoire a été supprimé avec succees';
      this.laboratoiresList.splice(this.laboratoiresList.indexOf(laboratoire), 1);
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }, err => {
      this.bodyText = 'une erreur est apparue , le laboratoire ne peut pas etres supprimer';
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    });
  }

  open(content, labo) {
    this.laboToDel = labo;
    this.showPopupButton = true;
    this.bodyText = 'Êtes-vous sûr de vouloir continuer?';
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result == 'Supprimer') {
        this.removeLabo(content, this.laboToDel);
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

  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  closeDialog() {
    this.modalService.dismissAll();
    this.laboratoireService.getAllLaboratoires().subscribe(res => {
      this.laboratoiresList = res;
    });
    this.afterAddCalled = true;
    this.addMessage = 'le laboratoire a été ajouter avec succees';
  }
}
