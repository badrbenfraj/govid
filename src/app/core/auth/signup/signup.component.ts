import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '@auth/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
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
        this.f.password.value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['/login'], {
            queryParams: { registered: true },
          });
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
