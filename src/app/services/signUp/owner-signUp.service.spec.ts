import { TestBed } from '@angular/core/testing';

import { OwnerSignUp } from './owner-signUp.service';

describe('OwnerLoginService', () => {
  let service: OwnerSignUp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerSignUp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
