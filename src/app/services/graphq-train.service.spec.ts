import { TestBed } from '@angular/core/testing';

import { GraphqTrainService } from './graphq-train.service';

describe('GraphqTrainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphqTrainService = TestBed.get(GraphqTrainService);
    expect(service).toBeTruthy();
  });
});
