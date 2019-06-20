import { Component } from '@angular/core';
import { SubmissionService } from '../submissions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-submissions-list',
  templateUrl: './submissions-list.component.html',
  styleUrls: ['./submissions-list.component.css']
})
export class SubmissionsListComponent {

  /**
   * Get an observable array from the search service
   * containing results from querying the search database
   */
  submissions: Observable<any[]> = this.submissionService.getAllItems();

  constructor(private submissionService: SubmissionService) { }

  onClick() {
    console.log('Title was clicked');
  }

}
