import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { shareAndCache } from '../share-and-cache-operator';
import { ResourcesService, Resource } from '../resources.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css'],
})
export class AdminConsoleComponent implements OnInit {
  /**
   * Get an observable array from the search service
   * containing results from querying the search database
   */
  resources: Observable<Resource[]> = this.resourceService.getAllWaitingResources();
  user;

  mobileQuery: MediaQueryList;

  constructor(
    private resourceService: ResourcesService,
    private router: Router,
    public afAuth: AngularFireAuth,
    media: MediaMatcher
  ) {
    this.user = afAuth.user.pipe(shareAndCache('credentials'));
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  /**
   * Load the first submission
   */
  ngOnInit(): void {
    this.resources.subscribe(stream => {
      console.log('Current resource: ', stream);
      console.log('Stream[0]: ', stream[0]);
      if (stream[0] != null) {
        this.router.navigate(['/admin-console', stream[0].id]);
      }
    });
  }
}
