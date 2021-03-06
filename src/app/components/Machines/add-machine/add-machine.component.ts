import { MachineInput } from './../../../core/models/machineInput';
import { Component, OnInit, Input } from '@angular/core';
import { MachineService } from '@app/core/services/machine.service';
import { AuthenticationService } from '@app/core/auth/services';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.scss']
})
export class AddMachineComponent implements OnInit {

  editView : boolean = false;
  machineInput= new MachineInput();
  creationDate: any;
  cancelButton;
  constructor(private machineService: MachineService, private authService: AuthenticationService, private _activatedRoute: ActivatedRoute , private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.cancelButton = {
      path: '/dashboard/machines',
      label: 'Annuler',
      icon: 'fas fa-undo',
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
    };

    this._activatedRoute.queryParams.subscribe(params => {
        this.editView = JSON.parse(params.editView) ;
        this.machineInput = JSON.parse(params.data);
        this.creationDate= this.datePipe.transform(this.machineInput.purchaseDate, "yyyy-MM-dd").toString();

  });
  
  }
  save() {
    if(this.editView==false){
      this.machineInput.purchaseDate=new Date (this.creationDate);
      this.machineInput.booked=false;
      this.machineInput.owner_id=this.authService.getCurrentUser.id;
      this.machineService.createMachine(this.machineInput).subscribe(data=>{
        this.machineService.sendConfirmation().subscribe(res=>{
        })
        this.router.navigate(["/dashboard/machines"]);

        

      })
    }
    else{
      let identifier = this.machineInput.id;
      this.update(identifier,this.machineInput);
    }
    
    
  }
  update(id, data){
    let updateInput = new MachineInput();
    updateInput.purchaseDate=new Date (data.date);
    updateInput.frequency=data.frequency;
    updateInput.debit= data.debit;
    updateInput.alimentation=data.alimentation;
    updateInput.saturation=data.saturation;
    updateInput.weight=data.weight;
    this.machineService.updateMachine(id, updateInput).subscribe(data=>{
      this.router.navigate(["/dashboard/machines"]);
    })
  }
}
