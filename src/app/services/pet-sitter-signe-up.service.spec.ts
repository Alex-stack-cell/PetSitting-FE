import { TestBed } from '@angular/core/testing';

import { PetSitterSigneUpService } from './pet-sitter-signe-up.service';

describe('PetSitterSigneUpService', () => {
  let service: PetSitterSigneUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetSitterSigneUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
