import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roaGuard } from './roa.guard';

describe('roaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
