import { TestBed } from '@angular/core/testing';

import { CarousalResolverService } from './carousal-resolver.service';

describe('CarousalResolverService', () => {
  let service: CarousalResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarousalResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
