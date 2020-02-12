import { TestBed } from '@angular/core/testing';

import { FlightSearchServiceService } from './flight-search-service.service';

describe('FlightSearchServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightSearchServiceService = TestBed.get(FlightSearchServiceService);
    expect(service).toBeTruthy();
  });
});
