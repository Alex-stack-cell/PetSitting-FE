import { TestBed } from '@angular/core/testing';

import { PetSitterSignUp } from './pet-sitter-sign-up.service';

describe('PetSitterSigneUpService', () => {
  let service: PetSitterSignUp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetSitterSignUp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
