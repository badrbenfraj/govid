import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MachineInput } from "../models/machineInput";


@Injectable({
    providedIn: 'root'
})
export class MachineService{
    constructor(private _http: HttpClient){
    }


    getAllMachines(){
        return this._http.get<any>(
            `/api/listmachines`
        )
    }
    getMachineByIdentifier(identifier: string) {
        return this._http.get<any>(
          `/api/machine` + identifier
        );
      }
      getMachineByFilters(filters: string) {
        return this._http.get<any>(
          `/api/machine?` + filters
        );
      }
    createMachine(body: MachineInput) {
        return this._http.post<any>(
          `/api/addMachine`,
          body
        )
      }
    removeMachine(identifier: string) {
        return this._http.post<any>(
          `/api/removeMachine/` + identifier, {}
        )
      }

    bookMachine(idUser: any, idMachine: any, body: any){
      return this._http.post<any>(
        `/api/reservationMachine/` + idUser + `/` + idMachine, body
      )
    }
    getMachinesByOwner(ownerId :string){
      return this._http.get<any>(
        `/api/machinesByOwner?owner_id=` + ownerId
      );
    }
}
