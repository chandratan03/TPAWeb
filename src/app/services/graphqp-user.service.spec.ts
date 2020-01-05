import { TestBed } from '@angular/core/testing';

import { GraphqpUserService } from './graphqp-user.service';

describe('GraphqpUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphqpUserService = TestBed.get(GraphqpUserService);
    expect(service).toBeTruthy();
  });
});
