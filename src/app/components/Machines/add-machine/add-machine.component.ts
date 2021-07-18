import { MachineInput } from './../../../core/models/machineInput';
import { Component, OnInit } from '@angular/core';
import { MachineService } from '@app/core/services/machine.service';
import { AuthenticationService } from '@app/core/auth/services';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.scss']
})
export class AddMachineComponent implements OnInit {

  constructor(private machineService: MachineService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }
  save(data) {
    let machineInput = new MachineInput();
    machineInput.purchaseDate=new Date (data.date);
    machineInput.frequency=data.frequence;
    machineInput.debit= data.debit;
    machineInput.alimentation=data.alimentation;
    machineInput.saturation=data.saturation;
    machineInput.weight=data.poids;
    machineInput.booked=false;
    machineInput.owner_id=this.authService.getCurrentUser().id;
    console.log(machineInput)
    this.machineService.createMachine(machineInput).subscribe(data=>{

      console.log("Machine Créer avec succes");
    })
    
  }
}
