import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-laboratory-agent',
  templateUrl: './new-laboratory-agent.component.html',
  styleUrls: ['./new-laboratory-agent.component.scss']
})
export class NewLaboratoryAgentComponent implements OnInit {
  buttonCancel:any;
  constructor() { }

  ngOnInit(): void {
    this.buttonCancel = {
      label: 'Cancel',
      path: '/dashboard/users/laboratoire'
    }
  }

}
