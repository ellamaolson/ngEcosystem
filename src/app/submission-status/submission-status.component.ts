import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { map, switchMap, filter } from 'rxjs/operators';
import { ResourcesService, Resource, status } from '../resources.service';

@Component({
  selector: 'app-submission-status',
  templateUrl: './submission-status.component.html',
})
export class SubmissionStatusComponent {
  statusId: Observable<string> = this.route.paramMap.pipe(map(selectId));
  resourceObservable: Observable<Resource> = this.route.paramMap.pipe(
    map(selectId),
    filter(id => !!id),
    mapIdToSubmission(this.resourceService)
  );
  status = status;

  constructor(private route: ActivatedRoute, private resourceService: ResourcesService) {}
}

/**
 * Gets the id from params
 * @param params
 */
function selectId(params: Params): string {
  return params.get('status-id');
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
