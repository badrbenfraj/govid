import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pharmacie} from '@models/pharmacie';


@Injectable({
  providedIn: 'root'
})
export class PharmacieService {
  private pharmaciesUrl = '/api/pharmacies';

  constructor(private http: HttpClient) {
  }

  getPharmacies(): Observable<Pharmacie[]> {
    return this.http.get<Pharmacie[]>(this.pharmaciesUrl);
  }

  addPharmacie(pharmacie: Pharmacie): Observable<Pharmacie> {
    return this.http.post<Pharmacie>('/api/addPharmacie', pharmacie);
  }

  editPharmacie(pharmacie: Pharmacie, identifier: number): Observable<Pharmacie> {
    return this.http.post<Pharmacie>('/api/pharmacie/update/' + identifier, pharmacie);
  }

  getById(identifier: number): Observable<Pharmacie> {
    return this.http.get<Pharmacie>('/api/pharmacie/' + identifier);
  }
  delete(identifier: number): Observable<Pharmacie> {
    return this.http.delete<Pharmacie>('/api/removePharmacie/' + identifier);
  }
}
