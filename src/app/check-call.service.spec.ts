import { TestBed, inject } from '@angular/core/testing';

import { CheckCallService } from './check-call.service';

describe('CheckCallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckCallService]
    });
  });

  it('should be created', inject([CheckCallService], (service: CheckCallService) => {
    expect(service).toBeTruthy();
  }));
});
