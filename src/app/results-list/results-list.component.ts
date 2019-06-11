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
  results = results;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) { }

  ngOnInit() {
  }

}
