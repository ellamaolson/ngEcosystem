import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit {
  results;

  constructor(private searchService: SearchService) {
    this.results = this.searchService.getDatabaseValues();
  }

  ngOnInit() {
  }

}
