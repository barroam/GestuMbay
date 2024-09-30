import { TestBed } from '@angular/core/testing';

import { SemencesService } from './semences.service';

describe('SemencesService', () => {
  let service: SemencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
