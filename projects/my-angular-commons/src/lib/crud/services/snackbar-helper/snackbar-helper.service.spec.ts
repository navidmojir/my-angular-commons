import { TestBed } from '@angular/core/testing';

import { SnackbarHelperService } from './snackbar-helper.service';

describe('SnackbarHelperService', () => {
  let service: SnackbarHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
