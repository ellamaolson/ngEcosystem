import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export enum status {
  denied = 0,
  approved = 1,
  waiting = 2,
}

export interface Resource {
  description: string;
  link: string;
  name: string;
  terms: string[];
  type: string;
  status: status;
  id?: string;
  date?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  resourceCollection: AngularFirestoreCollection;

  /**
   * Connect to firestore database and retrieve current values
   * @param db is the AngularFirestore database
   */
  constructor(private db: AngularFirestore) {
    this.resourceCollection = db.collection('resources');
  }

  /**
   * Updates the resource entry with new field values
   * @param resource
   */
  updateResource(resource: Resource): void {
    this.updateTerms(resource);
    this.resourceCollection.doc(resource.id).update(resource);
  }

  /**
   * Adds a new resource entry to the database
   * @param resource
   */
  addResource(resource: Resource): Promise<string> {
    console.log('Resources: Adding a new resource: ', resource);
    this.updateTerms(resource);
    return this.resourceCollection.add(resource).then(ref => ref.id);
  }

  /**
   * Updates the terms array of the resource to contain the
   * original search terms, the resource's name and type, and
   * lowercase versions of all terms.
   * @param resource
   */
  updateTerms(resource: Resource): void {
    const terms = [];
    for (const term of resource.terms) {
      console.log('resource terms: ', term);
      if (!resource[term.toLowerCase()]) {
        terms.push(term.toLowerCase());
      }
    }
    for (const term of terms) {
      resource.terms.push(term);
    }

    resource.terms.push(resource.name, resource.name.toLowerCase(), resource.type, resource.type.toLowerCase());

    for (const word of this.parseStringToArray(resource.name)) {
      resource.terms.push(word);
      resource.terms.push(word.toLowerCase());
    }
  }

  /**
   * Separates a string into a string array
   * @param term
   */
  parseStringToArray(term: string): string[] {
    console.log('Submission: Search Term string: ', term);
    return term.split(' ').map((item: string) => item.trim());
  }

  /**
   * Get all resources with status == denied
   */
  getAllDeniedResources(): Observable<Resource[]> {
    return this.queryResourcesByStatus(status.denied);
  }

  /**
   * Get all resources with status == approved
   */
  getAllApprovedResources(): Observable<Resource[]> {
    console.log('Resources Service: Querying for all approved resources!');
    return this.queryResourcesByStatus(status.approved);
  }

  /**
   * Get all resources with status == waiting
   */
  getAllWaitingResources(): Observable<Resource[]> {
    console.log('Resources Service: Querying for all waiting resources!');
    return this.queryResourcesByStatus(status.waiting);
  }

  /**
   * Queries database for resources based on status, orders them by type,
   * and returns a snapshot containing metadata of resource and its ID.
   * @param resourceStatus is the status
   */
  queryResourcesByStatus(resourceStatus: status): Observable<Resource[]> {
    console.log('Resource Service: Querying for status ', resourceStatus);
    return this.db
      .collection<Resource>('resources', ref => ref.orderBy('type').where('status', '==', resourceStatus))
      .snapshotChanges()
      .pipe(
        tap(value => console.log('Query for status ', value)),
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Resource;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  /**
   * Queries database for resources based on related search terms
   * and orders then by name
   * @param resourceTerm is the inquiring search term
   */
  queryResourcesBySearchTerm(resourceTerm: string): Observable<Resource[]> {
    console.log('Resource Service: Querying for search term ', resourceTerm);
    const resourceObservable: Observable<Resource[]> = this.db
      .collection<Resource>('resources', ref => ref.orderBy('name').where('terms', 'array-contains', resourceTerm))
      .valueChanges()
      .pipe(tap(value => console.log('Query for terms ', value)));

    return resourceObservable;
  }

  /**
   * Queries database for resources based on id
   * @param resourceTerm is the resource term entered
   */
  queryResourcesById(resourceId: string): Observable<Resource> {
    console.log('Resource Service: Querying for id ', resourceId);
    return this.db
      .doc<Resource>('resources/' + resourceId)
      .valueChanges()
      .pipe(tap(value => console.log(value)));
  }
}
