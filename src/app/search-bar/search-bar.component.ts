import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchForm = new FormGroup({
    searchTerm: new FormControl(''),
  });

  constructor(private router: Router) {}

  /**
   * Sends the search term to results page for querying and resets the searchForm.
   */
  onSearch() {
    this.router.navigate(['/results', this.searchForm.value.searchTerm]);
    this.searchForm.reset();
  }
}
