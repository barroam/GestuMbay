import { TestBed } from '@angular/core/testing';

import { ApprobationService } from './approbation.service';

describe('ApprobationService', () => {
  let service: ApprobationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprobationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
