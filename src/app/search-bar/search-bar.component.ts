import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchService } from '../search.service';
import { results } from '../results';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
  // add a search term??
  searchForm;
  service;
  router;
  results = results;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private angularRouter: Router
    ) {
    this.searchForm = this.formBuilder.group({ searchTerm: '' });
    this.service = this.searchService;
    this.router = this.angularRouter;
  }

  /**
   * Searches for matching results to searchterm and adds
   * them to the searchService. Then, resets the searchForm.
   * @param searchterm
   */
  onSearch(searchterm) {
    console.log('You are searching for ',  searchterm);

    this.service.empty(); // first empty the first to reset the search results.

    console.log('Search Results: ', this.service.getItems());

    for (const result of results) {
      this.service.addItem(result);
    }
    console.log('Search Results: ', this.service.getItems());

    // ToDo: query a database or look through json file for searchterm
    // ToDo: add the results to searchService with searchService.addItem()

    this.searchForm.reset();
    this.router.navigate(['/results']); // was in button [routerLink]="['/results']"
  }

  ngOnInit() {}
}
