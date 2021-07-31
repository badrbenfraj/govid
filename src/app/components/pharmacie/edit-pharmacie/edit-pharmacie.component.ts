import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pharmacie } from '@app/core/models/pharmacie';
import { PharmacieService } from '@app/core/services/pharmacie.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-pharmacie',
  templateUrl: './edit-pharmacie.component.html',
  styleUrls: ['./edit-pharmacie.component.scss']
})
export class EditPharmacieComponent implements OnInit {

  buttonCancel: any;
  pharmacie: Pharmacie;
  agent:string;
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

    this.route.params.subscribe(params => {
      this.agent = params.name;
      this.buttonCancel = {
        label: 'Cancel',
        path: `/dashboard/users/${this.agent}`,
        icon: 'fas fa-undo'
      };
      this.pharmacieService.getById(params.id).subscribe(pharmacie => {
        this.pharmacie = pharmacie;
        this.createForm.patchValue({
          ...pharmacie
        });
      });
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

    this.pharmacieService.editPharmacie({
      name: this.f.name.value,
      description: this.f.description.value,
      horaire: this.f.horaire.value,
      gouvernement: this.f.gouvernement.value,
      testCovid: this.f.testCovid.value,
      location: this.f.location.value
    },1).pipe(first())
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
