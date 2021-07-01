import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient){}

  login(body){
    const headers = { 'content-type': 'application/json'};
    console.log(body);
    return this.http.post('http://localhost:8000/login', body, {headers}).subscribe(a => console.log(a));
  }
}
