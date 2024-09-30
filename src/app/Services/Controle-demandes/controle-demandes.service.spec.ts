import { TestBed } from '@angular/core/testing';

import { ControleDemandesService } from './controle-demandes.service';

describe('ControleDemandesService', () => {
  let service: ControleDemandesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControleDemandesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
