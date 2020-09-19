import { TestBed } from '@angular/core/testing';

import { SmallGroupsService } from './small-groups.service';

describe('SmallGroupsService', () => {
  let service: SmallGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmallGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
