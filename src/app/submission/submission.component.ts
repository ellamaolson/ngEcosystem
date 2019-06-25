import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SubmissionService, Submission } from '../submissions.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css'],
})
export class SubmissionComponent implements OnInit {
  id: Observable<string> = this.route.paramMap.pipe(map(selectId));
  submission: Observable<Submission> = this.route.paramMap.pipe(
    map(selectId),
    filter(id => !!id),
    mapIdToSubmission(this.submissionService)
  );

  constructor(private route: ActivatedRoute, private submissionService: SubmissionService) {
    console.log('Submission: about to do a query');

  }

  ngOnInit() {

  }

  approve() {}

  deny() {}
}

/**
 * Gets the id from params
 * @param params
 */
function selectId(params: Params): string {
  return params.get('id');
}

/**
 * Take in a thing, query firestore, and return results
 * @param submissionService
 */
function mapIdToSubmission(submissionService: SubmissionService) {
  return (idStream: Observable<string>): Observable<Submission> => {
    return idStream.pipe(switchMap(id => submissionService.query(id)));
  };
}
