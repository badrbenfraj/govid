import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PharmacieService} from '@services/pharmacie.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-add-pharmacie',
  templateUrl: './add-pharmacie.component.html',
  styleUrls: ['./add-pharmacie.component.scss']
})
export class AddPharmacieComponent implements OnInit {
  buttonCancel: any;
  agent: string;
  createForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private pharmacieService: PharmacieService) {
  }

  ngOnInit(): void {
    this.buttonCancel = {
      label: 'Annuler',
      path: `/dashboard/pharmacie`
    };
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      testCovid: ['', [Validators.required]],
      location: ['', [Validators.required]],
      horaire: ['', [Validators.required]],
      gouvernement: ['', [Validators.required]],
    });
  }

  get f() {
    return this.createForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.createForm.invalid) {
      return;
    }

    this.loading = true;

    this.pharmacieService.addPharmacie({
      name: this.f.name.value,
      description: this.f.description.value,
      horaire: this.f.horaire.value,
      gouvernement: this.f.gouvernement.value,
      testCovid: this.f.testCovid.value,
      location: this.f.location.value
    }).pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([`/dashboard/pharmacie`], {});
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }

}
