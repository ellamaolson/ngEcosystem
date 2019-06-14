import { Component, OnInit, OnChanges, ViewContainerRef } from '@angular/core';
import { SearchService } from '../search.service';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ResultOverlayComponent } from '../result-overlay/result-overlay.component';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit, OnChanges {
  results = this.searchService.getItems();
  overlayRef: OverlayRef;
  nextPosition = 0;

  constructor(
    private searchService: SearchService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) {
    console.log('Results in result-list: ', this.results);
  }

  ngOnInit() {
    this.ngOnChanges();
  }

  /**
   * Sort results based on name
   */
  ngOnChanges() {
    this.results.sort((a, b) => {
      const aname = a.name.toUpperCase();
      const bname = b.name.toUpperCase();

      if (aname < bname) {
        return -1;
      } else if (aname > bname) {
        return 1;
      } else {
        return 0;
      }
    });
  }

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
