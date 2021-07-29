import { Component, OnInit } from '@angular/core';
import { MachineService } from '@app/core/services/machine.service';

@Component({
  selector: 'app-pie-chart-machine',
  templateUrl: './pie-chart-machine.component.html',
  styleUrls: ['./pie-chart-machine.component.scss']
})
export class PieChartMachineComponent implements OnInit {
  data: any;
 
  constructor(private machineService: MachineService) {
    
   }
  ngOnInit() {
  let nbrMachine;
  let nbrReservations;
  this.machineService.getAllMachines().subscribe(data=>{
     nbrMachine=data.length;
     this.machineService.getAllReservations().subscribe(reser=>{
       nbrReservations=reser.length;
       this.data = {
        labels: ['Total machines','Machines reservée'],
        datasets: [
            {
                data: [nbrMachine, nbrReservations],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB"
                ]
            }]
        };
     })
     
  })
}
}
