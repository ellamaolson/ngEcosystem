import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  term; // the search term used to fill items
  items = []; // stores a list of current search results

  constructor(private http: HttpClient) {}

  addItem(result) {
    this.items.push(result);
  }

  getItems() {
    return this.items;
  }

  empty() {
    this.items = [];
    return this.items;
  }

  getDatabaseValues() : Observable<any> {
    return this.http.get('/assets/database.json');
  }
}
