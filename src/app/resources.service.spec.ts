import { TestBed } from '@angular/core/testing';

import { ResourcesService } from './resources.service';

describe('ResourcesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourcesService = TestBed.get(ResourcesService);
    expect(service).toBeTruthy();
  });
});
