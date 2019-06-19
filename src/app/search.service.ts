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
   * @param db
   */
  constructor(private db: AngularFirestore) {
    this.searchCollection = db.collection('test');
    this.searchdb = this.searchCollection.valueChanges();

    // How to add to the database in firebase
    // this.searchCollection.add({
    //   name: 'Spongebob',
    //   type: 'icon',
    //   description: 'a sponge that lives under the sea in a pineapple',
    //   terms: ['sponge', 'spongebob', 'nickelodeon', 'frycook']
    // });
  }

  /**
   * Create a query to retrieve terms that match the searchTerm
   * @param searchTerm
   */
  query(searchTerm: string) {
    console.log('Querying');
    this.resultObservable = this.db
      .collection('test', ref =>
        ref.where('terms', 'array-contains', searchTerm)
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
}
