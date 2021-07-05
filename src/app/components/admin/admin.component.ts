import {Component, NgZone, OnInit} from '@angular/core';
import {DattaConfig} from '@config';
import {Location} from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '@app/core/auth/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public dattaConfig: any;
  public navCollapsed: boolean;
  public navCollapsedMob: boolean;
  public windowWidth: number;

  constructor(private zone: NgZone, private location: Location, private cookieService: CookieService, private userService: UserService) {
    this.dattaConfig = DattaConfig.config;

    let current_url = this.location.path();
    if (this.location['_baseHref']) {
      current_url = this.location['_baseHref'] + this.location.path();
    }

    if (current_url === this.location['_baseHref'] + '/layout/collapse-menu' || current_url === this.location['_baseHref'] + '/layout/box') {
      this.dattaConfig['collapse-menu'] = true;
    }

    this.windowWidth = window.innerWidth;
    this.navCollapsed = (this.windowWidth >= 992) ? this.dattaConfig['collapse-menu'] : false;
    this.navCollapsedMob = false;
  }

  ngOnInit() {
    const userEmail = this.cookieService.get('email');
    this.userService.getByEmail(userEmail).subscribe(a=>console.log(a));
  }

  navMobClick() {
    if (this.navCollapsedMob && !(document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open'))) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }

}
