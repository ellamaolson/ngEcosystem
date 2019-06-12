import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { results } from '../results';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit {
  results = results;

  constructor(private searchService: SearchService) {
    console.log('Results are: ', this.results);
  }

  ngOnInit() {
    // sort results based on type
    this.results.sort((a, b) => {
      console.log('The change: ', a.type);
      a.type = this.camelize(a.type);
      console.log('The change: ', a.type);
      b.type = this.camelize(b.type);
      const atype = a.type.toUpperCase();
      const btype = b.type.toUpperCase();

      if (atype < btype) {
        return -1;
      } else if (atype > btype) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  // Courtesy of https://gist.github.com/ZoolWay/3a6ed3b5f8c6ddf0a77b112f22821d17
  camelize(s: string): string {
    s = s.toLowerCase();

    return s
      .replace(/(?:^|[-_])(\w)/g, (letter) => {
        return letter ? letter.toUpperCase() : '';
      }).replace(/(^\w)/, letter => letter.toUpperCase());
  }
}
