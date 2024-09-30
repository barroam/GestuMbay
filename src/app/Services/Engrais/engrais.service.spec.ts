import { TestBed } from '@angular/core/testing';

import { EngraisService } from './engrais.service';

describe('EngraisService', () => {
  let service: EngraisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngraisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
