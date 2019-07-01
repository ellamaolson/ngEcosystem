import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResourcesService, status, Resource } from '../resources.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css'],
})
export class SubmissionComponent {
  idObservable: Observable<string> = this.route.paramMap.pipe(map(selectId));

  resourceObservable: Observable<Resource> = this.route.paramMap.pipe(
    map(selectId),
    filter(id => !!id),
    mapIdToSubmission(this.resourceService)
  );

  searchTermsForm = new FormGroup({
    searchTerms: new FormControl('', [Validators.required]),
  });

  constructor(private route: ActivatedRoute, private router: Router, private resourceService: ResourcesService) {}

  /**
   * Parses the parameter into a string array without extra whitespaces or commas.
   * @param term
   */
  parseTermsToArray(term: string): string[] {
    return term.split(',').map((item: string) => item.trim());
  }

  /**
   * Approves the current submission by changing the status
   * from waiting to approved and updating the database.
   * Also updates the id and search terms array.
   * @param current is the current Submission
   */
  approve(current: Resource, id: string): void {
    if (this.searchTermsForm.valid) {
      current.id = id;
      current.status = status.approved;
      current.terms = this.parseTermsToArray(this.searchTermsForm.value.searchTerms);
      this.resourceService.updateResource(current);
      this.router.navigate(['/submission-status', id]);
    } else {
      window.alert('Please enter in matching search terms for this submission.');
    }
  }

  deny(current: Resource, id: string): void {
    current.status = status.denied;
    this.resourceService.updateResource(current);
    this.router.navigate(['/submission-status', id]);
  }
}

/**
 * Gets the router id from params
 * @param params
 */
function selectId(params: Params): string {
  return params.get('id');
}

/**
 * Queries database for submission and returns an Observable of the results.
 * @param resourceService
 */
function mapIdToSubmission(resourceService: ResourcesService) {
  return (idStream: Observable<string>): Observable<Resource> => {
    return idStream.pipe(switchMap(id => resourceService.queryResourcesById(id)));
  };
}
