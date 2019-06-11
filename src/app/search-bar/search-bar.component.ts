import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  // add a search term??
  searchForm;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      searchTerm: ''
    });
  }

  onSearch(data) {
    // Process search data here
    console.warn('You are searching for ',  data);
    // set the searchTerm service to this data??


    // clear the search term??
    this.searchForm.reset();
  }

  ngOnInit() {}
}
