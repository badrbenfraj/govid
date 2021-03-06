import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '@app/core/auth/services';
import {laboratoire} from '@app/core/models/laboratoire';
import {LaboratoireService} from '@app/core/services/laboratoire.service';
import {Role} from '@auth/models';

@Component({
  selector: 'app-laboratoire-card',
  templateUrl: './laboratoire-card.component.html',
  styleUrls: ['./laboratoire-card.component.scss']
})
export class LaboratoireCardComponent implements OnInit {
  @Input() laboratoire: laboratoire;
  currentUserRole: any;
  isAdminRole: boolean = true;

  constructor(private authService: AuthenticationService, private router: Router, private laboratoireService: LaboratoireService) {
  }

  ngOnInit(): void {
    const roles = this.authService.getCurrentUser && this.authService.getCurrentUser.roles;
    this.isAdminRole = this.authService.findCommonRoles(roles, [Role.Admin, Role.agentLabo]);
  }

  previewLabo() {

    localStorage.setItem('laboratoireUpdateMode', 'false');
    this.router.navigate(['/dashboard/laboratoire/laboratoireDashboard'], {
      queryParams: {
        id: this.laboratoire.id
      }
    });
  }

  openLocation() {
    this.router.navigate(['/dashboard/laboratoire/laboratoireMap'], {
      queryParams: {
        idLocation: this.laboratoire.id
      }
    });
  }

  updateLabo() {
    localStorage.setItem('laboratoireUpdateMode', 'true');
    this.router.navigate(['/dashboard/laboratoire/laboratoireDashboard'], {
      queryParams: {
        id: this.laboratoire.id
      }
    });
  }

  removeLabo() {
    this.laboratoireService.removeLaboratoire(this.laboratoire.id.toString()).subscribe();
  }
}
