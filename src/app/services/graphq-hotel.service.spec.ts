import { TestBed } from '@angular/core/testing';

import { GraphqHotelService } from './graphq-hotel.service';

describe('GraphqHotelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphqHotelService = TestBed.get(GraphqHotelService);
    expect(service).toBeTruthy();
  });
});
