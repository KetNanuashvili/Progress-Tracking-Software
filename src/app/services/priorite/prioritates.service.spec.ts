import { TestBed } from '@angular/core/testing';

import { PrioritatesService } from './prioritates.service';

describe('PrioritatesService', () => {
  let service: PrioritatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrioritatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
