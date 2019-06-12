import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  // ToDo: set results to the items[] from searchService, not this statis results list
  results = this.searchService.getItems();

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) {
    console.log('Results in result-list: ', this.results);
  }

  ngOnInit() {
    // sort results based on name
    this.results.sort((a, b) => {
      console.log('The change: ', a.name);
      a.name = this.camelize(a.name);
      console.log('The change: ', a.name);
      b.name = this.camelize(b.name);
      const aname = a.name.toUpperCase();
      const bname = b.name.toUpperCase();

      if (aname < bname) {
        return -1;
      } else if (aname > bname) {
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
          return letter ? letter.toUpperCase() : ''; })
        .replace(/(^\w)/, letter => letter.toUpperCase());
    }

}
