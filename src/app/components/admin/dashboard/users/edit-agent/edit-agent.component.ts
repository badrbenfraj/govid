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
  agent = 'laboratoire';
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
    this.buttonAdd = {
      label: 'Add',
      path: '/dashboard/users/new',
      param: ``
    };
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.route.params.subscribe(params => {
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
    this.authenticationService
      .register(
        this.f.firstName.value,
        this.f.lastName.value,
        this.f.email.value,
        this.f.password.value,
        [`ROLE_${this.agent.toUpperCase()}_AGENT`]
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


