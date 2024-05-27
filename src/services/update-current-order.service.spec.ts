import { TestBed } from '@angular/core/testing';

import { UpdateCurrentOrderService } from './update-current-order.service';

describe('UpdateCurrentOrderService', () => {
  let service: UpdateCurrentOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCurrentOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
