import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { laboratoire } from '@models/laboratoire';
import { Observable } from 'rxjs';
import { comment } from '../models/comment';


@Injectable({
    providedIn: 'root'
})
export class CommentService{
    constructor(private _http: HttpClient){
    }


    getAllComments(){
        return this._http.get<any>(
            `/api/listComments` 
        );
    }
  
    createComment(body: comment) {
        return this._http.post<any>(
          `/api/addComment`,
          body
        );
      }
 
      removeComment(identifier: string) {
        return this._http.post<any>(
          `/api/removeComment/` + identifier, {}
        );
      }
}
