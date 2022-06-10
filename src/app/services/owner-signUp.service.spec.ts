import { TestBed } from '@angular/core/testing';

import { OwnerSignUpService } from './owner-signUp.service';

describe('OwnerLoginService', () => {
  let service: OwnerSignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerSignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
