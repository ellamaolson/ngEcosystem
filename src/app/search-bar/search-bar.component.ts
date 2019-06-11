import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
  // add a search term??
  searchForm;
  service;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService
    ) {
    this.searchForm = this.formBuilder.group({ searchTerm: '' });
    this.service = this.searchService;
  }

  /**
   * Searches for matching results to searchterm and adds
   * them to the searchService. Then, resets the searchForm.
   * @param searchterm
   */
  onSearch(searchterm) {
    console.warn('You are searching for ',  searchterm);

    this.service.empty(); // first empty the first to reset the search results.

    // ToDo: query a database or look through json file for searchterm
    // ToDo: add the results to searchService with searchService.addItem()

    this.searchForm.reset();
  }

  ngOnInit() {}
}
