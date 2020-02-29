import { TestBed } from '@angular/core/testing';

import { GraphqpCheckOutService } from './graphqp-check-out.service';

describe('GraphqpCheckOutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphqpCheckOutService = TestBed.get(GraphqpCheckOutService);
    expect(service).toBeTruthy();
  });
});
