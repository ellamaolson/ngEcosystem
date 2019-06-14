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
   * @param searchterm
   */
  onSearch() {
    this.searchService.empty();
    this.findResults();

    if (this.searchService.isEmpty()) {
      window.alert('No search results found :/');
      this.searchForm.reset();
    } else {
      this.searchForm.reset();
      console.log('About to navigate to results...');
      this.router.navigate(['/results']);
    }
  }

  /**
   * Search through data array for matching search terms
   */
  findResults() {
    for (const result of this.results) {
      for (const term of result.terms) {
        if (term === this.searchForm.value.searchTerm) {
          this.searchService.addItem(result);
          break;
        }
      }
    }
    console.log('Service: ', this.searchService.getItems());
  }
}
