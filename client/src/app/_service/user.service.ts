import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: string;

  set setCurrentUser(val: string){
    this.currentUser =  val;
  }

  get getCurrentUser(){
    return this.currentUser;
  }

  constructor(private http: HttpClient) { }

  validateUserByEmail(email){
    return this.http.get<{result: boolean}>(`http://localhost:3000/api/users/${email}`);
  }

  saveUser(obj){
    return this.http.post(`http://localhost:3000/api/users`, obj);
  }

  getAllUsers(){
    return this.http.get(`http://localhost:3000/api/users`);
  }

  login(obj: object){
    return this.http.post<{token: string}>(`http://localhost:3000/auth`, obj);
  }


}
