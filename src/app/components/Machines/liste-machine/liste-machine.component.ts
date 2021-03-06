import { first } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MachineService } from 'src/app/core/services/machine.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { element } from 'protractor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '@app/core/auth/services';



@Component({
  selector: 'app-liste-machine',
  templateUrl: './liste-machine.component.html',
  styleUrls: ['./liste-machine.component.scss']
})
export class ListeMachineComponent implements OnInit {
  listeMachine: any;
  pageSize = 10;
  filter: any;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageFirstRow: number;
  rowsPerPage: number;
  pageLastRow: number;
  displayedList: any = [];
  filteredList: any = [];
  showBookingDialog: boolean = false;
  currentUserId: any;
  currentUserRole: any;
  currentUser: any;
  dateTo: any;
  dateFrom: any;
  idbookedMachine: any;
  showingMyMachines: boolean = false;
  addButton;
  reservationOn: boolean = false;
  noData: boolean = false;
  showStatDialog: boolean= false;
  adminRoleOn: boolean = false;
  successBooking: boolean = false;
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;

  constructor(private machineService: MachineService, private datePipe: DatePipe, private modalService: NgbModal, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.addButton = {
      label: 'Ajouter machine',
      path: '/dashboard/machines/add',
      icon: 'fas fa-user-plus',
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
    };

    this.filter = {
      date: '',
      frequence: '',
      debit: '',
      alimentation: '',
      saturation: ''
    }
    this.getMachines();
    this.currentUserId = this.authService.getCurrentUser.id;

    this.currentUser = this.authService.getCurrentUser;
    this.currentUserRole = this.authService.getCurrentUser.roles;
    if(this.currentUserRole.includes("ROLE_ADMIN")){
      this.adminRoleOn = true;
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    });
  }

  getMachines() {
    this.showingMyMachines= false;
    this.rowsPerPage = 10;
    this.pageFirstRow = 0;
    this.pageLastRow = (this.pageFirstRow + this.rowsPerPage) - 1;
    this.machineService.getAllMachines().subscribe(data => {
      this.listeMachine = [];
      data.forEach((machine, index) => {
        this.listeMachine.push({

          id: machine.id,
          purchaseDate: machine.purchaseDate,
          frequency: machine.frequency,
          debit: machine.debit,
          alimentation: machine.alimentation,
          saturation: machine.saturation,
          ownerId: machine.ownerId,
          booked: machine.booked,
          weight: machine.weight,
        });
      })
      this.filteredList = this.listeMachine;
      this.displayedList = this.filteredList.slice(0, this.pageSize);
      if(this.displayedList.length==0){
        this.noData = true;
      }else{
        this.noData = false;
      }
      let pageIndex = 0;

    });
  }

  loadFilter() {
    this.filteredList = this.listeMachine.filter((element) => this.filterCheck(element));
    this.displayedList = this.filteredList.slice(0, this.pageSize);
    // this.paginator.firstPage();
  }

  filterCheck(element): boolean {
    let dateEvaluation = true;
    let frequencyEvaluation = true;
    let debitEvaluation = true;
    let alimentationEvaluation = true;
    let saturationEvaluation = true;
    if (this.filter.frequence != null) {
      frequencyEvaluation = element.frequency && element.frequency.toString().includes(this.filter.frequence);
    }
    if (this.filter.debit != null) {
      debitEvaluation = element.debit && element.debit.toString().includes(this.filter.debit);
    }
    if (this.filter.alimentation != null) {
      alimentationEvaluation = element.alimentation && element.alimentation.toString().includes(this.filter.alimentation);
    }
    if (this.filter.saturation != null) {
      saturationEvaluation = element.saturation && element.saturation.toString().includes(this.filter.saturation);
    }
    if (this.filter.date) {
      // element.date.setHours(0, 0, 0, 0);
      dateEvaluation = this.datePipe.transform(element.purchaseDate, "yyyy-MM-dd").toString() === this.filter.date;
    }
    return frequencyEvaluation && debitEvaluation && alimentationEvaluation && saturationEvaluation && dateEvaluation;
  }


  showTwo(i) {
    if (i < 2) return true;
    return false;
  }

  paginate(event) {
    this.rowsPerPage = event.rows;
    this.pageFirstRow = event.first;
    this.pageLastRow = (this.pageFirstRow + this.rowsPerPage) - 1;

  }
  onPageChange($event) {
    this.pageSize = $event.pageSize
    this.filteredList = this.listeMachine.filter((element) => this.filterCheck(element));
    this.displayedList = this.filteredList.slice($event.pageIndex * $event.pageSize,
      $event.pageIndex * $event.pageSize + $event.pageSize);
  }
  showModalBook(id) {
    this.successBooking= false;
    this.showBookingDialog = true;
     this.idbookedMachine = id;
  }
  bookMachine() {
    this.successBooking= false;
    this.machineService.bookMachine(this.currentUserId, this.idbookedMachine, this.dateTo).subscribe(data => {
     // this.showBookingDialog = false;
      this.reservationOn = true;
      this.successBooking= true;
      console.log(this.reservationOn);
      console.log(this.successBooking);
      this.getMachines();
      let emailBody = {
        message: "Vous avez reserver une machine d'oxyg??ne sur Govid.tn. vous pouvez prendre contact avec le proprietaire sur son adresse email : " + this.authService.getCurrentUser.email + ". On vous souhaite prompt r??tablissement."
            }
      this.machineService.sendEmail(emailBody).subscribe(res=>{
      })

    }
    ,err => {
      this.reservationOn = true;
      this.getMachines();
      // this.showBookingDialog = true;
    }

    )
  }

  showMyMachines(){
    this.showingMyMachines= true;
      this.rowsPerPage = 10;
      this.pageFirstRow = 0;
      this.pageLastRow = (this.pageFirstRow + this.rowsPerPage) - 1;
      this.machineService.getMachinesByOwner(this.currentUserId).subscribe(data => {
        this.listeMachine = [];
        data.forEach((machine, index) => {
          this.listeMachine.push({
  
            id: machine.id,
            purchaseDate: machine.purchaseDate,
            frequency: machine.frequency,
            debit: machine.debit,
            alimentation: machine.alimentation,
            saturation: machine.saturation,
            ownerId: machine.ownerId,
            booked: machine.booked,
            weight: machine.weight
          });
        })
        this.filteredList = this.listeMachine;
        this.displayedList = this.filteredList.slice(0, this.pageSize);
        if(this.displayedList.length==0){
          this.noData = true;
        }else{
          this.noData = false;
        }
        let pageIndex = 0;
  
  
      });
    
  }
  removeMachine(id){
    this.machineService.removeMachine(id).subscribe(data=>{
      if(this.showingMyMachines){
        this.showMyMachines();
      }else{
        this.getMachines();

      }
    })
  }
  showStat(){
  this.showStatDialog = true;
  }
  closeStat(){
    this.showStatDialog = false;
  }
}
