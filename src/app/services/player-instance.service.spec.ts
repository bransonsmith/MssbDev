import { TestBed } from '@angular/core/testing';

import { PlayerInstanceService } from './player-instance.service';

describe('PlayerInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerInstanceService = TestBed.get(PlayerInstanceService);
    expect(service).toBeTruthy();
  });
});
