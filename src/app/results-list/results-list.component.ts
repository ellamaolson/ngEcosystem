import { Component, OnInit} from '@angular/core';
import { ResourcesService, Resource } from '../resources.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ResultsListComponent implements OnInit {
  /**
   * Get searchterm passed through router, query database for it,
   * and save results.
   */
  searchTerm: string;

  /**
   * Get an observable array from the search service
   * containing results from querying the search database
   */
  dataSource: Observable<any[]>;
  columnsToDisplay = ['name', 'bundleSize'];
  expandedElement: Resource | null;

  constructor(private resourceService: ResourcesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    console.log('THE SEARCH TERM IS: ', this.searchTerm);
    if (this.searchTerm !== null) {
      this.dataSource = this.resourceService.queryApprovedResourcesBySearchTerm(this.searchTerm);
    }
  }
}
