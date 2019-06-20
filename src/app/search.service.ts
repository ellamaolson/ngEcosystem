import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  /**
   * stores an Observable list of current search results
   */
  resultObservable: Observable<any>;
  /**
   * Collection from the firestore database
   */
  searchCollection: AngularFirestoreCollection<any>;
  /**
   * Current values of the firestore database
   */
  searchdb: Observable<any[]>;

  /**
   * Connect to firestore database and retrieve up-to-date values
   * @param db is the AngularFirestore database
   */
  constructor(private db: AngularFirestore) {
    this.searchCollection = db.collection('search');
    this.searchdb = this.searchCollection.valueChanges();
  }

  /**
   * Create a query to retrieve terms that match the searchTerm
   * and orders then by name
   * @param searchTerm is the search term entered
   */
  query(searchTerm: string) {
    console.log('Querying for ', searchTerm);
    this.resultObservable = this.db
      .collection('search', ref =>
        ref.orderBy('name').where('terms', 'array-contains', searchTerm)
      )
      .valueChanges()
      .pipe(tap(value => console.log(value)));
  }

  /**
   * Get the resulting observable from the query and subscribe to check its values
   */
  getItems() {
    console.log('Getting Items: ', this.resultObservable);
    this.resultObservable.subscribe(item =>
      console.log('Printing this: ', item)
    );
    return this.resultObservable;
  }

  /**
   * Gets all items
   */
  getAllItems() {
    return this.searchdb;
  }

  /**
   * Gets all items in the database and orders them by type
   */
  getAllItemsOrderByType() {
    return this.db.collection('search', ref => ref.orderBy('type')).valueChanges();
  }
}
