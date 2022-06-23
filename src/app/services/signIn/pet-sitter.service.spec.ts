import { TestBed } from '@angular/core/testing';

import { PetSitterService } from './pet-sitter.service';

describe('PetSitterService', () => {
  let service: PetSitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetSitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
