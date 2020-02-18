import { TestBed } from '@angular/core/testing';

import { GraphqCarService } from './graphq-car.service';

describe('GraphqCarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphqCarService = TestBed.get(GraphqCarService);
    expect(service).toBeTruthy();
  });
});
