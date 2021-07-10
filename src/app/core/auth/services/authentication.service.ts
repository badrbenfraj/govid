import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@environment/environment';
import {User} from '@auth/models/';
import {UserService} from '@auth/services/user.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  private currentUserSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private userService: UserService, private cookieService: CookieService) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('loggedUser'))
    );
    this.user = this.userSubject.asObservable();
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.base_path}/login`, {email, password})
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          this.userService.getByEmail(email).subscribe(currentUser => {
            localStorage.setItem('loggedUser', JSON.stringify(currentUser));
            this.currentUserSubject.next(currentUser);
          });
          return user;
        })
      );
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roles = ['USER_ROLE']
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
}
