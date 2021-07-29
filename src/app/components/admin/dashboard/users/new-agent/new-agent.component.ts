import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '@auth/services';

@Component({
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html',
  styleUrls: ['./new-agent.component.scss']
})
export class NewAgentComponent implements OnInit {
  buttonCancel: any;
  agent: string;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.agent = params.name;
      this.buttonCancel = {
        label: 'Cancel',
        path: `/dashboard/users/${this.agent}`
      };
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
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
