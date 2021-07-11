import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MedecinInput} from '@models/medecinInput';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  constructor(private _http: HttpClient) {
  }


  getAllMedecins() {
    return this._http.get<any>(
      `/api/listmedecins`
    );
  }

  getMedecinByIdentifier(identifier: number) {
    return this._http.get<any>(
      `/api/medecin/` + identifier
    );
  }

  getMedecinByFilters(filters: string) {
    return this._http.get<any>(
      `/api/medecinWithFilters?` + filters
    );
  }

  createMedecin(body: MedecinInput) {
    return this._http.post<any>(
      `/api/addMedecin`,
      body
    );
  }

  removeMedecin(identifier: number): Observable<any> {
    return this._http.post<any>(
      `/api/removeMedecin/${identifier}`, {}
    );
  }

  updateMedecin(identifier: number, body: MedecinInput): Observable<any> {
    const token = localStorage.getItem('user');
    return this._http.post<any>(
      `/api/medecin/update/${identifier}`, body
      );
  }
}
