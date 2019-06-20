import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SubmissionService } from '../submissions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-submission',
  templateUrl: './new-submission.component.html',
  styleUrls: ['./new-submission.component.css']
})
export class NewSubmissionComponent {
  submissionForm = new FormGroup({
    description: new FormControl(''),
    email: new FormControl(''),
    link: new FormControl(''),
    name: new FormControl(''),
    person: new FormControl(''),
    type: new FormControl(''),
    terms: new FormControl('')
  });

  constructor(private submissionService: SubmissionService,
              private router: Router) {}

  onSubmit() {
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

    this.router.navigate(['admin-console']);
  }
}
