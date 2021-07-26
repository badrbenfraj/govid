import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core/auth/services/authentication.service';
import { MachineService } from '@app/core/services/machine.service';

@Component({
  selector: 'app-machine-history',
  templateUrl: './machine-history.component.html',
  styleUrls: ['./machine-history.component.scss']
})
export class MachineHistoryComponent implements OnInit {

  listeReservations;
  idMachine:any;
  cancelButton:any;
  noData:boolean = false;
  currentUserRole: any;
  adminRoleOn: boolean = false;
  constructor(private machineService: MachineService, private _activatedRoute: ActivatedRoute ,private datePipe: DatePipe, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.cancelButton = {
      path: '/ListMachines',
      label: 'Annuler',
      icon: 'fas fa-undo'
    };
    this.currentUserRole = this.authService.getCurrentUser.roles;
    if(this.currentUserRole.includes("ADMIN_ROLE")){
      this.adminRoleOn = true;
      console.log(this.adminRoleOn)
    }
    console.log(this.currentUserRole)

    this._activatedRoute.queryParams.subscribe(params => {
      this.idMachine = JSON.parse(params.idMachine) ;
      console.log(this.idMachine)

});
      this.machineService.getReservationsByMachine(this.idMachine).subscribe(data => {
        this.listeReservations = [];
        console.log(data.length);
        if(data.length!=0){
          data.forEach((reservation, index) => {
            this.listeReservations.push({
    
              id_machine: reservation.machine.id ,
              user: reservation.user.firstName+ " " + reservation.user.lastName,
              userEmail: reservation.user.email,
              dateFrom:  this.datePipe.transform(reservation.dateFrom, "yyyy-MM-dd").toString(),
              dateTo:  this.datePipe.transform(reservation.dateTo, "yyyy-MM-dd").toString(),
            });
            
          })
        }
      else{
        this.noData= true;
      }
      });
      console.log(this.noData)    
  }

}
