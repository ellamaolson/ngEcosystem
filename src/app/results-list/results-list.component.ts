import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ResourcesService } from '../resources.service';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ResultOverlayComponent } from '../result-overlay/result-overlay.component';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {
  overlayRef: OverlayRef;
  nextPosition = 0;
  searchTerm: string;

  /**
   * Get an observable array from the search service
   * containing results from querying the search database
   */
  results: Observable<any[]>;

  constructor(
    private resourceService: ResourcesService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    db: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  /**
   * Get searchterm passed through router, query database for it,
   * and save results.
   */
  ngOnInit() {
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    this.results = this.resourceService.queryResourcesBySearchTerm(this.searchTerm);
  }

  /**
   * creates an overlay
   */
  openOverlay() {
    const config = new OverlayConfig();
    config.positionStrategy = this.overlay
      .position()
      .global()
      .left(`${this.nextPosition}px`)
      .top(`${this.nextPosition}px`);

    this.nextPosition += 30;

    config.hasBackdrop = true;

    const overlayRef = this.overlay.create(config);
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
    overlayRef.attach(
      new ComponentPortal(ResultOverlayComponent, this.viewContainerRef)
    );
  }
}
