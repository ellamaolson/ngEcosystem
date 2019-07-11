import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResourcesService, Resource, status } from '../resources.service';

@Component({
  selector: 'app-new-submission',
  templateUrl: './new-submission.component.html',
  styleUrls: ['./new-submission.component.css'],
})
export class NewSubmissionComponent {
  submissionForm = new FormGroup({
    bundleSize: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    npm: new FormControl(''),
    terms: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  ngAddChecked: false;
  ngUpdateChecked: false;

  @ViewChild('successPopup', { static: false }) successPopup;
  @ViewChild('failurePopup', { static: false }) failurePopup;
  dialogRef;
  statusUrl: string;



  constructor(private resourceService: ResourcesService, private router: Router, public dialog: MatDialog) {}

  /**
   * Create a new submission, add it to the database, and notify of success.
   */
  onSubmit(): void {
    if (!this.submissionForm.valid) {
      alert('Please fill out all form boxes.');
      return;
    }

    if (this.ngAddChecked == null) {
      this.ngAddChecked = false;
    }

    if(this.ngUpdateChecked == null) {
      this.ngUpdateChecked = false;
    }

    console.log(
      'New Submission: ngAdd ',
      this.ngAddChecked, ' and ngUpdate',
      this.ngUpdateChecked
    );

    try {
      const sub: Resource = {
        bundleSize: this.submissionForm.value.bundleSize,
        date: Date.now(),
        description: this.submissionForm.value.description,
        link: this.submissionForm.value.link,
        name: this.submissionForm.value.name,
        ngAdd: this.ngAddChecked,
        ngUpdate: this.ngUpdateChecked,
        npm: 'https://www.npmjs.com/package/' + this.submissionForm.value.npm,
        status: status.waiting,
        terms: this.parseStringToArray(this.submissionForm.value.terms),
        type: this.submissionForm.value.type,
      };

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
