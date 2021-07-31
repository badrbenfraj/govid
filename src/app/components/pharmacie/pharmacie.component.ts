import {Component, OnInit} from '@angular/core';
import {PharmacieService} from '@services/pharmacie.service';
import {Pharmacie} from '@models/pharmacie';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Role} from '@auth/models';

@Component({
  selector: 'app-pharmacie',
  templateUrl: './pharmacie.component.html',
  styleUrls: ['./pharmacie.component.scss']
})
export class PharmacieComponent implements OnInit {
  buttonAdd: any;
  pharmacies: Pharmacie[] = [];
  searchForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(private pharmacieService: PharmacieService, private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      testCovid: ['', [Validators.required]],
      horaire: ['', [Validators.required]]
    });
    this.buttonAdd = {
      label: 'Ajouter',
      path: '/dashboard/pharmacie/new',
      icon: 'fas fa-user-plus',
      roles: [Role.agentPhamacy, Role.Admin]
    };
    this.getPharmacies();
  }

  get f() {
    return this.searchForm.controls;
  }

  criteria(key?: string): any {
    const source = {};
    let target;
    let result;
    // testcovid
    // horaire
    if (this.f.horaire.value !== '') {
      target = {
        horaire: this.f.horaire.value
      };
      result = Object.assign(target, source);
    }
    if (this.f.testCovid.value !== '') {
      target = {
        testCovid: this.f.horaire.value
      };
      result = Object.assign(target, source);
    }

    return result;
  }

  getPharmacies(): void {
    this.pharmacieService.getPharmacies().subscribe(data => {
      this.pharmacies = data.filter((item) => {
        for (const key in this.criteria()) {
          if (item[key] === undefined || item[key] !== this.criteria(key)) {
            return false;
          }
        }
        return true;
      });
    });
  }

  delete(id: number): void {
    this.pharmacieService.delete(id).subscribe();
    this.getPharmacies();
  }
}
