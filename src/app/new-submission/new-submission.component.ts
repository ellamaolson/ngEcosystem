import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResourcesService, Resource, status } from '../resources.service';

@Component({
  selector: 'app-new-submission',
  templateUrl: './new-submission.component.html',
})
export class NewSubmissionComponent {
  /**
   * Form to enter all new submission input, with some validators
   * for required inputs.
   */
  submissionForm = new FormGroup({
    bundleSize: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    github: new FormControl(''),
    link: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    npm: new FormControl(''),
    terms: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  /**
   * ng-add and ng-update checkbox values
   */
  ngAddChecked: false;
  ngUpdateChecked: false;

  @ViewChild('successPopup', { static: false }) successPopup;
  @ViewChild('failurePopup', { static: false }) failurePopup;
  dialogRef;
  statusUrl: string;

  constructor(private resourceService: ResourcesService, private router: Router, public dialog: MatDialog) {}

  /**
   * Validate input, create a new submission, add it to the database, and notify of success.
   */
  onSubmit(): void {
    if (!this.submissionForm.valid) {
      alert('Please fill out all form boxes.');
      return;
    }

    const formValue = this.submissionForm.value;

    const sub: Resource = {
      bundleSize: formValue.bundleSize,
      date: Date.now(),
      description: formValue.description,
      github: '',
      link: formValue.link,
      name: formValue.name,
      ngAdd: this.ngAddChecked,
      ngUpdate: this.ngUpdateChecked,
      npm: '',
      status: status.waiting,
      terms: this.parseStringToArray(formValue.terms),
      type: formValue.type,
    };

    if (formValue.github.length > 0) {
      formValue.github.includes('https://github.com/')
        ? (sub.github = formValue.github)
        : (sub.github = 'https://github.com/' + formValue.github);
    }

    if (formValue.npm.length > 0) {
      formValue.npm.includes('https://www.npmjs.com/package/')
        ? (sub.npm = formValue.npm)
        : (sub.npm = 'https://www.npmjs.com/package/' + formValue.npm);
    }

    if (this.ngAddChecked == null) {
      sub.ngAdd = false;
    }

    if (this.ngUpdateChecked == null) {
      sub.ngUpdate = false;
    }

    try {
      // Add resource to database
      this.resourceService.addResource(sub).then(subId => {
        this.statusUrl = subId;
      });

      this.dialogRef = this.dialog.open(this.successPopup, {
        width: '600px',
      });
    } catch (error) {
      this.dialogRef = this.dialog.open(this.failurePopup, {
        width: '600px',
      });
    }

    if (this.statusUrl) {
      this.router.navigate(['/submission-status', this.statusUrl]);
    }
  }

  /**
   * Separates a string into a string array
   * @param term
   */
  parseStringToArray(term: string): string[] {
    return term.split(',').map((item: string) => item.trim());
  }

  routeToStatusPage(): void {
    this.router.navigate(['/submission-status', this.statusUrl]);
    this.dialogRef.close();
  }
}
