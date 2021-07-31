import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { laboratoire } from '@models/laboratoire';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LaboratoireService{
    constructor(private _http: HttpClient){
    }


    getAllLaboratoires(){
        return this._http.get<any>(
            `/api/listLaboratoires` 
        );
    }
    getLaboratoireByIdentifier(identifier: string) {
        return this._http.get<any>(
          `/api/laboratoire/` + identifier
        );
      }
      getLaboratoireByFilters(filters: string) {
        return this._http.get<any>(
          `/api/laboratoire?` + filters
        );
      }
    createLaboratoire(body: laboratoire) {
        return this._http.post<any>(
          `/api/addLaboratoire`,
          body
        );
      }
    removeLaboratoire(identifier: string) {
        return this._http.post<any>(
          `/api/removeLaboratoire/` + identifier, {}
        );
      }
      updateLaboratoire(identifier: number, body: laboratoire): Observable<any> {
        const token = localStorage.getItem('user');
        return this._http.post<any>(
          `/api/laboratoire/update/${identifier}`, body
          );
      }

}
