import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  set setCurrentUser(val: string) {
    localStorage.setItem('currentUser', val);
    // this.currentUser =  val;
  }

  get getCurrentUser() {
    // return this.currentUser;
    return localStorage.getItem('currentUser');
  }

  constructor(private http: HttpClient,  private router: Router,) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  validateUserByEmail(email) {
    return this.http.get<{ result: boolean }>(`https://localhost:3000/api/users/${email}`);
  }

  saveUser(obj) {
    return this.http.post<{ result: boolean }>(`https://localhost:3000/api/users`, obj);
  }

  getAllUsers() {
    return this.http.get(`https://localhost:3000/api/users`);
  }

  login(obj: object) {
    return this.http.post<{ token: string }>(`https://localhost:3000/auth`, obj).pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // this.router.navigate(['/login']);
  }

  checkUser(obj: object) {
    return this.http.post<{ token: string }>(`https://localhost:3000/auth`, obj);
  }


}
