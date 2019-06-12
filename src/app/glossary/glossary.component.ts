import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit {
  results = this.searchService.getDatabaseValues().pipe(
    map(data => data.sort((a,b) => a.type - b.type)));


  constructor(private searchService: SearchService) {

    // this.results.sort((a,b) => a.type - b.type);

    console.log('Results are: ', this.results);
  }

  ngOnInit() {
  }

}
