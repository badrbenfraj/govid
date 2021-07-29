import {Component, OnInit} from '@angular/core';
import {AuthenticationService, UserService} from '@auth/services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  loggedUser;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationService) {
    this.loggedUser = this.authenticationService.getCurrentUser;
    delete this.loggedUser.password;
  }

  ngOnInit(): void {
    this.updateProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.updateProfileForm.patchValue({
      ...this.loggedUser
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateProfileForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateProfileForm.invalid) {
      return;
    }

    this.loading = true;

    this.userService.update(this.loggedUser.id, {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      password: this.f.password.value,
      address: this.f.address.value,
      city: this.f.city.value,
      country: this.f.country.value,
      postal_code: this.f.postal_code.value
    }).pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );;
  }

}
