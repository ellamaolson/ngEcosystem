import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SubmissionService } from '../submissions.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-submission',
  templateUrl: './new-submission.component.html',
  styleUrls: ['./new-submission.component.css'],
})
export class NewSubmissionComponent {
  submissionForm = new FormGroup({
    description: new FormControl(''),
    email: new FormControl(''),
    link: new FormControl(''),
    name: new FormControl(''),
    person: new FormControl(''),
    type: new FormControl(''),
    terms: new FormControl(''),
  });

  @ViewChild('successPopup', { static: false }) successPopup;
  @ViewChild('failurePopup', { static: false }) failurePopup;
  dialogRef;
  statusUrl: string;

  constructor(private submissionService: SubmissionService, private router: Router, public dialog: MatDialog) {
    this.statusUrl = 'Hi.com';
  }

  onSubmit(): void {
    try{
      this.submissionService.addItem(
        this.submissionForm.value.description,
        this.submissionForm.value.email,
        this.submissionForm.value.link,
        this.submissionForm.value.name,
        this.submissionForm.value.person,
        this.submissionForm.value.type,
        this.submissionForm.value.terms,
        Date.now(),
      );

      this.dialogRef = this.dialog.open(this.successPopup, {
        width: '600px',
        data: { url: this.statusUrl },
      });

    } catch(error) {
      this.dialogRef = this.dialog.open(this.failurePopup, {
        width: '600px',
      });
    }
  }

  onHomeClick(): void {
    this.router.navigate(['/']);
    this.dialogRef.close();
  }
}
