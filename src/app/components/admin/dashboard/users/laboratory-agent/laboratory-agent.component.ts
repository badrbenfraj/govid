import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laboratory-agent',
  templateUrl: './laboratory-agent.component.html',
  styleUrls: ['./laboratory-agent.component.scss']
})
export class LaboratoryAgentComponent implements OnInit {
  buttonAdd;
  constructor() { }

  ngOnInit(): void {
    this.buttonAdd = {
      label: 'Add',
      path: '/dashboard/users/laboratoire/new'
    }
  }

}
