import { TestBed } from '@angular/core/testing';

import { StatCollectionService } from './stat-collection.service';

describe('StatCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatCollectionService = TestBed.get(StatCollectionService);
    expect(service).toBeTruthy();
  });
});
