import { TestBed } from '@angular/core/testing';

import { WaiterPaymentService } from './waiter-payment.service';

describe('WaiterPaymentService', () => {
  let service: WaiterPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaiterPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
