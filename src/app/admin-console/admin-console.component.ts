import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { shareAndCache } from '../share-and-cache-operator';
import { ResourcesService, Resource } from '../resources.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
})
export class AdminConsoleComponent implements OnInit {
  /**
   * Get an observable array from the search service
   * containing results from querying the search database
   */
  resources: Observable<Resource[]> = this.afAuth.user.pipe(
    switchMap(() => this.resourceService.getAllWaitingResources())
  );
  user;

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    private resourceService: ResourcesService,
    private router: Router,
    public afAuth: AngularFireAuth,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this.user = afAuth.user.pipe(shareAndCache('credentials'));
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
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
