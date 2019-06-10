import { Component, OnInit } from '@angular/core';
import { results } from '../results';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.css']
})
export class ResultDetailsComponent implements OnInit {
  result;

  constructor() { }

  ngOnInit() {
  }

}
