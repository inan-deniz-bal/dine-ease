import { TestBed } from '@angular/core/testing';

import { WaiterTableHandlerService } from './waiter-table-handler.service';

describe('WaiterTableHandlerService', () => {
  let service: WaiterTableHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaiterTableHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
