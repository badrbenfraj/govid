import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '@environment/environment';
import {User} from '@auth/models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {
  }

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
    return this.http.get<User>(`${environment.base_path}/user/${email}`);
  }

  update(id: number, user: User): Observable<User> {
    return this.http.post<User>(`${environment.base_path}/user/update/${id}`, {...user}).pipe(
      map((loggedUser) => {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        return user;
      })
    );
  }

  delete(id: number): Observable<User>{
    return this.http.post<User>(`${environment.base_path}/user/delete/${id}`, {});
  }
}
