import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { shareAndCache } from '../share-and-cache-operator';
import { ResourcesService, Resource } from '../resources.service';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css'],
})
export class AdminConsoleComponent {
  /**
   * Get an observable array from the search service
   * containing results from querying the search database
   */
  resources: Observable<Resource[]> = this.resourceService.getAllWaitingResources();
  user;

  constructor(private resourceService: ResourcesService, public afAuth: AngularFireAuth) {
    this.user = afAuth.user.pipe(shareAndCache('credentials'));
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
