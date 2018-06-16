import { TestBed, inject } from '@angular/core/testing';

import { NgHelpersService } from './ng-helpers.service';

describe('NgHelpersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgHelpersService]
    });
  });

  it('should be created', inject([NgHelpersService], (service: NgHelpersService) => {
    expect(service).toBeTruthy();
  }));
});
