import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  /**
   * stores an Observable list of current submissions results
   */
  resultObservable: Observable<any>;
  /**
   * Collection from the firestore database
   */
  submissionsCollection: AngularFirestoreCollection<any>;
  /**
   * Current values of the firestore database
   */
  submissionsdb: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.submissionsCollection = db.collection('submissions');
    this.submissionsdb = this.submissionsCollection.valueChanges();
    this.submissionsdb.subscribe(item => console.log('HERE: ', item));
  }

  /**
   * Create a query to retrieve terms that match the searchTerm
   * @param searchTerm is the search term entered
   */
  query(searchTerm: string) {
    console.log('Querying');
    this.resultObservable = this.db
      .collection('submissions', ref => ref.where('terms', 'array-contains', searchTerm))
      .valueChanges()
      .pipe(tap(value => console.log(value)));
  }

  addItem(
    description: string,
    email: string,
    link: string,
    name: string,
    person: string,
    terms: string[],
    type: string,
    date: number,
  ) {

    this.submissionsCollection.add({
      description,
      email,
      link,
      name,
      person,
      terms,
      type,
      date,
    });
  }

  /**
   * Get the resulting observable from the query and subscribe to check its values
   */
  getAllItems() {
    return this.db.collection('submissions', ref => ref.orderBy('date')).valueChanges();
  }
}
