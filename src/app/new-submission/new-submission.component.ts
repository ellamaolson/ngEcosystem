import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SubmissionService } from '../submissions.service';
import { Submission } from '../submission';

@Component({
  selector: 'app-new-submission',
  templateUrl: './new-submission.component.html',
  styleUrls: ['./new-submission.component.css']
})
export class NewSubmissionComponent {
  submissionForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    description: new FormControl(''),
    link: new FormControl(''),
    personName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private submissionService: SubmissionService) {}

  onSubmit() {
    const bundleSize = 0;
    // ToDo: trigger automatic bundle measurer

    const entry = new Submission(
      this.submissionForm.value.name,
      this.submissionForm.value.type,
      this.submissionForm.value.description,
      this.submissionForm.value.link,
      bundleSize,
      this.submissionForm.value.personName,
      this.submissionForm.value.email
    );
    this.submissionService.addItem(entry);
  }
}
