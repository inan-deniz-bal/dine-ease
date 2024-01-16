import { TestBed } from '@angular/core/testing';

import { TemporaryOrderService } from './temporary-order.service';

describe('TemporaryOrderService', () => {
  let service: TemporaryOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporaryOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
