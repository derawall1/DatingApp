import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model)
      .pipe(
        map((response: User) => {
          const user = response;
          if (user) {

            this.setCurrentUser(user);
          }

        })
      )
  }
  register(model: any) {
    return this.http.post(this.baseUrl + "account/register", model)
      .pipe(
        map((user:User) => {
          if (user) {
            this.setCurrentUser(user);
          }
          
        })
      )
  }
  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.setCurrentUser(null);
  }
}
