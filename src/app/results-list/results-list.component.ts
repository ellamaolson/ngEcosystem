import { Component, OnInit } from '@angular/core';
import { results } from '../results';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  // ToDo: set results to the items[] from searchService, not this statis results list
  results;
  service;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) {
    this.service = this.searchService;
    this.results = this.service.getItems();
    console.log('Results: ', this.results);
  }

  ngOnInit() {
  }

}
