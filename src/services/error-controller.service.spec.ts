import { TestBed } from '@angular/core/testing';

import { ErrorControllerService } from './error-controller.service';

describe('ErrorControllerService', () => {
  let service: ErrorControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
