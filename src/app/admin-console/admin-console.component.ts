import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { shareAndCache } from '../share-and-cache-operator';
import { ResourcesService, Resource } from '../resources.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css'],
})
export class AdminConsoleComponent implements OnDestroy {
  /**
   * Get an observable array from the search service
   * containing results from querying the search database
   */
  resources: Observable<Resource[]> = this.resourceService.getAllWaitingResources();
  user;

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    private resourceService: ResourcesService,
    public afAuth: AngularFireAuth,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.user = afAuth.user.pipe(shareAndCache('credentials'));

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', e => {
      if (e.matches) {
        /* the viewport is 600 pixels wide or less */
        console.log('This is a narrow screen — less than 600px wide.');
      } else {
        /* the viewport is more than than 600 pixels wide */
        console.log('This is a wide screen — more than 600px wide.');
      }
    });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
