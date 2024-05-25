import { TestBed } from '@angular/core/testing';

import { AdminSelectedOrderService } from './admin-selected-order.service';

describe('AdminSelectedOrderService', () => {
  let service: AdminSelectedOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSelectedOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
