import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResourcesService, Resource, status} from '../resources.service';

@Component({
  selector: 'app-new-submission',
  templateUrl: './new-submission.component.html',
  styleUrls: ['./new-submission.component.css'],
})
export class NewSubmissionComponent {
  submissionForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    terms: new FormControl('', [Validators.required]),
  });

  @ViewChild('successPopup', { static: false }) successPopup;
  @ViewChild('failurePopup', { static: false }) failurePopup;
  dialogRef;
  statusUrl: string;

  constructor(private resourceService: ResourcesService, private router: Router, public dialog: MatDialog) {
    this.statusUrl = 'Hi.com';
  }

  /**
   * Create a new submission, add it to the database, and notify of success.
   */
  onSubmit(): void {
    if (!this.submissionForm.valid) {
      alert('Please fill out all form boxes.');
      return;
    }

    try {
      const sub: Resource = {
        description: this.submissionForm.value.description,
        link: this.submissionForm.value.link,
        name: this.submissionForm.value.name,
        status: status.waiting,
        terms: this.parseStringToArray(this.submissionForm.value.terms),
        type: this.submissionForm.value.type,
        date: Date.now(),
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
