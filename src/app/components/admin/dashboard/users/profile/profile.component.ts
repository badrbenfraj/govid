import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@auth/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggedUser;

  constructor(private authenticationService: AuthenticationService) {
    this.loggedUser = this.authenticationService.getCurrentUser;
  }

  ngOnInit(): void {
  }

}
