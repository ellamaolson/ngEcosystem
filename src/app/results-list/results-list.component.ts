import { Component, ViewContainerRef } from '@angular/core';
import { SearchService } from '../search.service';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ResultOverlayComponent } from '../result-overlay/result-overlay.component';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent {
  overlayRef: OverlayRef;
  nextPosition = 0;

  /**
   * Get an observable array from the search service
   * containing results from querying the search database
   */
  results: Observable<any[]> = this.searchService.getItems();

  constructor(
    private searchService: SearchService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    db: AngularFirestore
  ) {}

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
