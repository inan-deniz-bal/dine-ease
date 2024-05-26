import { TestBed } from '@angular/core/testing';

import { RestaurantByTableService } from './restaurant-by-table.service';

describe('RestaurantByTableService', () => {
  let service: RestaurantByTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantByTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
