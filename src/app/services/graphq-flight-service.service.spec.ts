import { TestBed } from '@angular/core/testing';

import { GraphqFlightService } from './graphq-flight.service';

describe('GraphqFlightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphqFlightService = TestBed.get(GraphqFlightService);
    expect(service).toBeTruthy();
  });
});
