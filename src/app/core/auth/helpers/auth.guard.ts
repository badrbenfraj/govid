import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {AuthenticationService, UserService} from '@auth/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) { }

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
          const user = this.authenticationService.getCurrentUser;
          const userRoles = this.authenticationService.getCurrentUser;
          const roles = route.data.roles ? route.data.roles : [];
          let currentUserRole = true;
          if(userRoles) {
            currentUserRole = this.authenticationService.findCommonRoles(roles, userRoles.roles);
          }
        if (user) {
            // check if route is restricted by role
            if (!currentUserRole) {
                // role not authorised so redirect to home page
                this.router.navigate(['/404']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        window.location.reload();
        return false;
    }
}
