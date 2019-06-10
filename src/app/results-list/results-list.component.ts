import { Component, OnInit } from '@angular/core';
import { results } from '../results';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {
  results = results;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

}
