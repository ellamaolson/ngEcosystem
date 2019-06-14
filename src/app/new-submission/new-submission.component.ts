import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SubmissionService } from '../submissions.service';

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
    searchTerms: new FormControl(''),
  });

  constructor(private submissionService: SubmissionService) {
    this.test();
  }

  onSubmit() {
    console.log('You entered:');
    console.log('Name: ', this.submissionForm.value.name);
    console.log('Type: ', this.submissionForm.value.type);
    console.log('Description: ', this.submissionForm.value.description);
    console.log('searchTerms: ', this.submissionForm.value.searchTerms);
  }

  test() {
    this.submissionService.addItem('elana', 'person', 'she is a swe', ['girl', 'human', 'swe']);
    this.submissionService.addItem('tanner', 'person', 'he is a swe', ['boy', 'human', 'swe', 'dork']);

    console.log('Items are: ', this.submissionService.toString());
  }
}
