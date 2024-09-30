import { TestBed } from '@angular/core/testing';

import { InfoDemandesService } from './info-demandes.service';

describe('InfoDemandesService', () => {
  let service: InfoDemandesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoDemandesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
