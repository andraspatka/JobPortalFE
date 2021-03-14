import { TestBed } from '@angular/core/testing';

import { JobsPortalService } from './jobs-portal.service';

describe('JobsPortalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobsPortalService = TestBed.get(JobsPortalService);
    expect(service).toBeTruthy();
  });
});
