import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { checkGuard } from './check.guard';

describe('checkGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
