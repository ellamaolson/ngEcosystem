import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
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
    private searchService: SearchService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    db: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.searchTerm = params.get('searchTerm');
    });
    this.searchService.query(this.searchTerm);
    this.results = this.searchService.getItems();
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
