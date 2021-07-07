import { Component, DoCheck, OnInit } from '@angular/core'
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap'
import { animate, style, transition, trigger } from '@angular/animations'
import { DattaConfig } from '@config'
import {AuthenticationService, UserService} from '@app/core/auth/services';
import { Router } from '@angular/router'
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class NavRightComponent implements OnInit, DoCheck {
  public visibleUserList: boolean
  public chatMessage: boolean
  public friendId: boolean
  public dattaConfig: any
  public loggedUser: any

  constructor(
    config: NgbDropdownConfig,
    private authenticationService: AuthenticationService,
    private route: Router,
    private userService: UserService
  ) {
    config.placement = 'bottom-right'
    this.visibleUserList = false
    this.chatMessage = false
    this.dattaConfig = DattaConfig.config
  }

  ngOnInit() {
    this.loggedUser = this.userService.loggedUser;
  }

  logout() {
    this.authenticationService.logout();
  }

  onChatToggle(friend_id) {
    this.friendId = friend_id
    this.chatMessage = !this.chatMessage
  }

  ngDoCheck() {
    if (document.querySelector('body').classList.contains('datta-rtl')) {
      this.dattaConfig['rtl-layout'] = true
    } else {
      this.dattaConfig['rtl-layout'] = false
    }
  }
}
