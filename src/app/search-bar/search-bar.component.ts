import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  searchForm = new FormGroup({
    searchTerm: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) {}

  /**
   * Sends the search term to results page for querying and resets the searchForm.
   */
  onSearch() {
    if (!this.searchForm.valid) {
      alert('Please enter in a search.');
      return;
    }
    this.router.navigate(['/results', this.searchForm.value.searchTerm]);
    this.searchForm.reset();
  }
}
