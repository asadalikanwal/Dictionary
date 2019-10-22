import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  search(obj) {
    return this.http.get(`https://localhost:3000/api/search/${obj.vocab}`);
  }

  constructor(private http: HttpClient) {}


}
