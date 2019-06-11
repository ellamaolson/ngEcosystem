import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  term; // the search term used to fill items
  items = []; // stores a list of current search results

  constructor() {}

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
}
