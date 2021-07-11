import {Component, OnInit} from '@angular/core';
import {User} from '@auth/models';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService, UserService} from '@auth/services';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.scss']
})
export class EditAgentComponent implements OnInit {
  buttonAdd;
  agentUser: User;
  buttonCancel: any;
  agent;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.route.params.subscribe(params => {
      this.agent = params.name;
      this.buttonCancel = {
        label: 'Cancel',
        path: `/dashboard/users/${this.agent}`,
        icon: 'fas fa-undo'
      };
      this.userService.getById(params.id).subscribe(user => {
        this.agentUser = user;
        this.registerForm.patchValue({
          ...user
        });
      });
    });

  }

  capitalize(str): string {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService
      .update(
        this.agentUser.id,
        {
          firstName: this.f.firstName.value,
          lastName: this.f.lastName.value,
          email: this.f.email.value,
          password: this.f.password.value
        }
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([`/dashboard/users/${this.agent}`], {
            queryParams: {registered: true},
          });
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}


