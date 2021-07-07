import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment/environment';
import { User } from '@auth/models';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.base_path}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.base_path}/agent/${id}`);
    }

    getByRole(role: string): Observable<User[]> {
        return this.http.get<User[]>(`${environment.base_path}/users/${role}`);
    }

    getByEmail(email: string) {
        return this.http.get<User>(`${environment.base_path}/user/${email}`).subscribe((user) => {
          localStorage.setItem('loggedUser', JSON.stringify(user));
          this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));;
        });
    }
}
