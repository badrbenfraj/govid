import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pharmacie } from './pharmacie';


@Injectable({
  providedIn: 'root'
})
export class PharmacieService {
  private pharmaciesUrl = 'api/pharmacies';
  constructor(private http: HttpClient,) { }
  getPharmacies(): Observable<Pharmacie[]> {
    return this.http.get<Pharmacie[]>(this.pharmaciesUrl)
  }
}
