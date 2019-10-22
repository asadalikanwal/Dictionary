import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  wordAdded = new Subject();
  search(obj) {
    return this.http.get(`https://localhost:3000/api/search/${obj.vocab}`);
  }

  getAllWords(){
    return this.http.get<{words}>(`https://localhost:3000/api/search/`);
  }

  constructor(private http: HttpClient) {}


}
