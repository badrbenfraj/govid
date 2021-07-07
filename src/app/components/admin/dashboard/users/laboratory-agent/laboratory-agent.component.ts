import {Component, OnInit} from '@angular/core';
import {UserService} from '@auth/services';
import {User} from '@auth/models';

@Component({
  selector: 'app-laboratory-agent',
  templateUrl: './laboratory-agent.component.html',
  styleUrls: ['./laboratory-agent.component.scss']
})
export class LaboratoryAgentComponent implements OnInit {
  buttonAdd;
  agentUser: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.buttonAdd = {
      label: 'Add',
      path: '/dashboard/users/new',
      param: 'laboratoire'
    };
    this.userService.getByRole('ROLE_LABORATOIRE_AGENT').subscribe(users => {
      this.agentUser = users;
      console.log(this.agentUser);
    });
  }

}
