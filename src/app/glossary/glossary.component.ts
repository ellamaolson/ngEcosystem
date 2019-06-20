import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent {
  /**
   * Get an observable array from the search service
   * containing all results from the search database
   */
  allResults: Observable<any[]> = this.searchService.getAllItemsOrderByType();

  constructor(private searchService: SearchService) {
  }
}
