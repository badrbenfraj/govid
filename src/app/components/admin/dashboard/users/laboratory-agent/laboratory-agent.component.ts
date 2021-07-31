import {Component, OnInit} from '@angular/core';
import {UserService} from '@auth/services';
import {User} from '@auth/models';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-laboratory-agent',
  templateUrl: './laboratory-agent.component.html',
  styleUrls: ['./laboratory-agent.component.scss']
})
export class LaboratoryAgentComponent implements OnInit {
  buttonAdd;
  agentUser: User[];
  agent: string;
  agentName: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.agent = params.name;
      this.agentName = params.name;
      this.getAgents(params.name);
      this.buttonAdd = {
        label: 'Ajouter',
        path: '/dashboard/users/new',
        param: params.name,
        icon: 'fas fa-user-plus'
      };
    });
  }

  getAgents(agent): void {
    this.userService.getByRole(`ROLE_${agent.toUpperCase()}_AGENT`).subscribe(users => {
      this.agentUser = users;
    });
  }

  delete(id): void {
    this.userService.delete(id).subscribe();
    this.getAgents(this.agent);
  }

  capitalize(str): string {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  }
}
