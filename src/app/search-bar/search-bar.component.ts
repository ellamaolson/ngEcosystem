import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchService } from '../search.service';
import { results } from '../results';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchForm = new FormGroup({
    searchTerm: new FormControl('')
  });
  results = results;

  constructor(private searchService: SearchService, private router: Router) {}

  /**
   * Searches for matching results to searchterm and adds
   * them to the searchService. Then, resets the searchForm.
   * Search through database for matching search terms
   * @param searchterm
   */
  onSearch() {
    this.searchService.empty();
    this.searchService.query(this.searchForm.value.searchTerm);
    console.log('Service: ', this.searchService.getItems());
    this.searchForm.reset();
    console.log('About to navigate to results...');
    this.router.navigate(['/results']);
  }
}
