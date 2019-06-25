import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Submission {
  description: string;
  email: string;
  link: string;
  name: string;
  person: string;
  terms: string[];
  type: string;
  date: number;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  /**
   * stores an Observable list of current submissions results
   */
  submissionObservable: Observable<Submission>;
  /**
   * Collection from the firestore database
   */
  private submissionsCollection: AngularFirestoreCollection<any>;
  /**
   * Current values of the firestore database
   */
  private submissionsdb: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.submissionsCollection = db.collection<Submission>('submissions');
    this.submissionsdb = this.submissionsCollection.valueChanges();
    this.submissionsdb.subscribe(item => console.log('Submission Service: Submission database ', item));
  }

  /**
   * Create a query to retrieve terms that match the searchTerm
   * and orders then by name
   * @param searchTerm is the search term entered
   */
  query(id: string) {
    console.log('Submission Service: Querying for ', id);
    return this.db
      .doc<Submission>('submissions/' + id)
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
    date: number
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
    return this.db
      .collection<Submission>('submissions', ref => ref.orderBy('date'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Submission;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
}
