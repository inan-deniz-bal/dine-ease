import { TestBed } from '@angular/core/testing';

import { ClickedPastOrderService } from './clicked-past-order.service';

describe('ClickedPastOrderService', () => {
  let service: ClickedPastOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickedPastOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
