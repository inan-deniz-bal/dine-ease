import { TestBed } from '@angular/core/testing';

import { SelectedRestService } from './selected-rest.service';

describe('SelectedRestService', () => {
  let service: SelectedRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
