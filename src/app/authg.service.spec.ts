import { TestBed, inject } from '@angular/core/testing';

import { AuthgService } from './authg.service';

describe('AuthgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthgService]
    });
  });

  it('should be created', inject([AuthgService], (service: AuthgService) => {
    expect(service).toBeTruthy();
  }));
});
