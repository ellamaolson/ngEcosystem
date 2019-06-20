import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchService } from '../search.service';
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

  constructor(private searchService: SearchService, private router: Router) {}

  /**
   * Searches for matching results to searchterm and adds
   * them to the searchService. Then, resets the searchForm.
   * Search through database for matching search terms
   */
  onSearch() {
    this.router.navigate(['/results', this.searchForm.value.searchTerm]);
    this.searchForm.reset();
  }
}
