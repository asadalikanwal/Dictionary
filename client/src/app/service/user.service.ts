import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { User } from '@/_model'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  validateUserByEmail(email) {
    return this.http.get<{ result: boolean }>(`http://localhost:3000/users/${email}`);
  }

  // saveUser(obj){
  //   return this.http.post(`http://localhost:3000/users`, obj);
  // }
  //   register(user: User) {
  //     return this.http.post(`http://localhost:3000/users/register`, user);
  // }
  saveUser(obj) {
    return this.http.post(`http://localhost:3000/users`, obj);
  }

  login(obj) {
    return this.http.post('', obj);
  }
}
