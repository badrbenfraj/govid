import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@environment/environment';
import {User} from '@auth/models/';
import {UserService} from '@auth/services/user.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  private currentUserSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private userService: UserService) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('loggedUser'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public get getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.base_path}/login`, {email, password})
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  currentUser(): Observable<User> {
    return this.http
      .get<any>(`${environment.base_path}/user/me`)
      .pipe(
        map((user) => {
          localStorage.setItem('loggedUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roles = ['ROLE_USER']
  ) {
    return this.http.post<any>(`${environment.base_path}/register`, {
      firstName,
      lastName,
      email,
      password,
      roles,
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('loggedUser');
    this.userSubject.next(null);
  }

  findCommonRoles(array1, array2) {
    // Loop for array1
    for (let i = 0; i < array1.length; i++) {
      // Loop for array2
      for (let j = 0; j < array2.length; j++) {
        // Compare the element of each and
        // every element from both of the
        // arrays
        if (array1[i] === array2[j]) {
          // Return if common element found
          return true
        }
      }
    }

    // Return if no common element exist
    return false
  }
}
