import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from '@environment/environment'
import { User } from '@auth/models/'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>
  public user: Observable<User>

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    )
    this.user = this.userSubject.asObservable()
  }

  public get userValue(): User {
    return this.userSubject.value
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.base_path}/login`, { email, password })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user))
          this.userSubject.next(user)
          return user
        })
      )
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
    })
  }

  logout() {
    localStorage.removeItem('user')
    this.userSubject.next(null)
  }
}
