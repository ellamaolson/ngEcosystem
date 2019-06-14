import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  /**
   * the search term used to fill items
   */
  term;

  /**
   * stores a list of current search results
   */
  items = [];

  constructor() {}

  addItem(result) {
    this.items.push(result);
  }

  getItems() {
    return this.items;
  }

  isEmpty(): boolean {
    if (this.items.length > 0) {
      return false;
    }
    return true;
  }

  empty() {
    this.items = [];
    return this.items;
  }
}
