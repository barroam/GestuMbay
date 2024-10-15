import { TestBed } from '@angular/core/testing';

import { PartageServicesService } from './partage-services.service';

describe('PartageServicesService', () => {
  let service: PartageServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartageServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
