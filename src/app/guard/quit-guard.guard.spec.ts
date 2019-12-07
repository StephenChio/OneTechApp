import { TestBed, async, inject } from '@angular/core/testing';

import { QuitGuardGuard } from './quit-guard.guard';

describe('QuitGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuitGuardGuard]
    });
  });

  it('should ...', inject([QuitGuardGuard], (guard: QuitGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
