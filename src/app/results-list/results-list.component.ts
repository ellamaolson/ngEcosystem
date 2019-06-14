import { Component, OnInit, OnChanges, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
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
  nextPosition: number = 0;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) {
    console.log('Results in result-list: ', this.results);
  }

  ngOnInit() {
    this.ngOnChanges();
  }

  ngOnChanges() {
    console.log('In onChanges()');
    // sort results based on name
    this.results.sort((a, b) => {
      a.name = this.camelize(a.name);
      b.name = this.camelize(b.name);

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

  // Courtesy of https://gist.github.com/ZoolWay/3a6ed3b5f8c6ddf0a77b112f22821d17
  camelize(s: string): string {
    s = s.toLowerCase();

    return s
      .replace(/(?:^|[-_])(\w)/g, letter => {
        return letter ? letter.toUpperCase() : '';
      })
      .replace(/(^\w)/, letter => letter.toUpperCase());
  }

  openOverlay() {
    const config = new OverlayConfig();
    config.positionStrategy = this.overlay.position()
        .global()
        .left(`${this.nextPosition}px`)
        .top(`${this.nextPosition}px`);

    this.nextPosition += 30;

    config.hasBackdrop = true;

    const overlayRef = this.overlay.create(config);
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
    overlayRef.attach(new ComponentPortal(ResultOverlayComponent, this.viewContainerRef));

  }
}
