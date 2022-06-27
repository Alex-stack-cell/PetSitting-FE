import { TestBed } from '@angular/core/testing';

import { PetResolverServiceService } from './pet-resolver-service.service';

describe('PetResolverServiceService', () => {
  let service: PetResolverServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetResolverServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
