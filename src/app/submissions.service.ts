import { Injectable } from '@angular/core';
import { Submission } from './submission';

@Injectable({
  providedIn: 'root'
})

export class SubmissionService {
  items: Submission[] = []; // stores a list of current new submissions
  length = 0;

  constructor() {}

  addItem(entry) {
    this.items.push(entry);
  }

  deleteItem(entry) {
    let index = 0;
    for (let item of this.items) {
      if (item === entry) {
        break;
      }
      index++;
    }
    this.items.splice(index, 1);
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
    for (const item of this.items) {
      s += item.toString() + '\n';
    }
    return s;
  }
}
