import { TestBed } from '@angular/core/testing';

import { CurrentMenuService } from './current-menu.service';

describe('CurrentMenuService', () => {
  let service: CurrentMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
