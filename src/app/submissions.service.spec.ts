import { TestBed } from '@angular/core/testing';

import { SubmissionService } from './submissions.service';

describe('SubmissionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmissionService = TestBed.get(SubmissionService);
    expect(service).toBeTruthy();
  });
});
