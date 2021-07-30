import {Component, DoCheck, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {animate, style, transition, trigger} from '@angular/animations';
import {DattaConfig} from '@config';
import {AuthenticationService, UserService} from '@app/core/auth/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'})),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(100%)'})),
      ]),
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'})),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(-100%)'})),
      ]),
    ]),
  ],
})
export class NavRightComponent implements OnInit, DoCheck {
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  public dattaConfig: any;
  public loggedUser: any;

  constructor(
    config: NgbDropdownConfig,
    private authenticationService: AuthenticationService,
    private route: Router
  ) {
    if (!this.authenticationService.getCurrentUser) {
      this.authenticationService.currentUser().subscribe();
    //  window.location.reload();
    }
    this.loggedUser = this.authenticationService.getCurrentUser;
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;
    this.dattaConfig = DattaConfig.config;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authenticationService.logout();
  }

  onChatToggle(friendId): void {
    this.friendId = friendId;
    this.chatMessage = !this.chatMessage;
  }

  ngDoCheck(): void {
    if (document.querySelector('body').classList.contains('datta-rtl')) {
      this.dattaConfig['rtl-layout'] = true;
    } else {
      this.dattaConfig['rtl-layout'] = false;
    }
  }
}
