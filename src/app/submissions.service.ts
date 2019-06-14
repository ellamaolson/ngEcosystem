import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SubmissionService {
  items = []; // stores a list of current search results

  constructor() {}

  addItem(name, type, description, searchTerms) {
    const submission = {name, type, description, searchTerms};
    this.items.push(submission);
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

  toString(): string {
    let s = '';
    for (let item of this.items) {
      console.log('Item: ', item);
      s += item.toString();
    }
    return s;
  }
}
