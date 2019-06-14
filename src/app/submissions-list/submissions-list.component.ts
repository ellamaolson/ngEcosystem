import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../submissions.service';

@Component({
  selector: 'app-submissions-list',
  templateUrl: './submissions-list.component.html',
  styleUrls: ['./submissions-list.component.css']
})
export class SubmissionsListComponent implements OnInit {
  submissions = this.submissionService.getItems();

  constructor(private submissionService: SubmissionService) { }

  ngOnInit() {
  }

}
