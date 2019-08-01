import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResourcesService, status, Resource } from '../resources.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
})
export class SubmissionComponent {
  idObservable: Observable<string> = this.route.paramMap.pipe(map(selectId));

  resourceObservable: Observable<Resource> = this.route.paramMap.pipe(
    map(selectId),
    filter(id => !!id),
    mapIdToSubmission(this.resourceService)
  );

  /**
   * Edit submission fields
   */
  submissionEditsForm = new FormGroup({
    bundleSize: new FormControl(''),
    description: new FormControl(''),
    github: new FormControl(''),
    link: new FormControl(''),
    name: new FormControl(''),
    ngAddChecked: new FormControl(''),
    ngUpdateChecked: new FormControl(''),
    npm: new FormControl(''),
    terms: new FormControl(''),
    type: new FormControl(''),
  });

  /**
   * Fields of a resource
   */
  fields = ['type', 'description', 'terms', 'link', 'github', 'npm', 'bundleSize', 'ngAdd', 'ngUpdate'];

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  isMobile: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourcesService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', e => {
      if (e.matches) {
        /* the viewport is 600 pixels wide or less */
        this.isMobile = true;
        console.log('This is a narrow screen — less than 600px wide.');
      } else {
        /* the viewport is more than than 600 pixels wide */
        this.isMobile = false;
        console.log('This is a wide screen — more than 600px wide.');
      }
    });
  }

  /**
   * Approves the current submission by changing the status
   * from waiting to approved and updating the database.
   * Also updates the id and search terms array.
   * @param current is the current Submission
   */
  approve(current: Resource, id: string): void {
    const formValue = this.submissionEditsForm.value;

    if (formValue.type.length > 0) {
      current.type = formValue.type;
    }

    if (formValue.description.length > 0) {
      current.description = formValue.description;
    }

    if (formValue.terms.length > 0) {
      current.terms = this.parseTermsToArray(formValue.terms);
    }

    if (formValue.link.length > 0) {
      current.link = formValue.link;
    }

    if (formValue.github.length > 0) {
      formValue.github.includes('https://github.com/')
        ? (current.github = formValue.github)
        : (current.github = 'https://github.com/' + formValue.github);
    }

    if (formValue.npm.length > 0) {
      formValue.npm.includes('https://www.npmjs.com/package/')
        ? (current.npm = formValue.npm)
        : (current.npm = 'https://www.npmjs.com/package/' + formValue.npm);
    }

    if (formValue.bundleSize.length > 0) {
      current.bundleSize = formValue.bundleSize;
    }

    if (formValue.ngAddChecked !== '') {
      console.log('The new value of ngAdd is ', formValue.ngAddChecked);
      current.ngAdd = formValue.ngAddChecked;
    }

    if (formValue.ngUpdateChecked !== '') {
      console.log('The new value of ngUpdate is ', formValue.ngUpdateChecked);
      current.ngUpdate = formValue.ngUpdateChecked;
    }

    current.id = id;
    current.status = status.approved;
    this.resourceService.updateResource(current);
    this.router.navigate(['/submission-status', id]);
    this.submissionEditsForm.reset();
  }

  /**
   * Parses the parameter into a string array without extra whitespaces or commas.
   * @param term
   */
  parseTermsToArray(term: string): string[] {
    return term.split(',').map((item: string) => item.trim());
  }

  /**
   * Denies the submissio and updates the status page
   * @param current
   * @param id
   */
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
