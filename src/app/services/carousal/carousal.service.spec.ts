import { TestBed } from '@angular/core/testing';

import { CarousalService } from './carousal.service';

describe('CarousalService', () => {
  let service: CarousalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarousalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
