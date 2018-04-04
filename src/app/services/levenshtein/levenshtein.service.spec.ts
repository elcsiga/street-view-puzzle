import { TestBed, inject } from '@angular/core/testing';

import { LevenshteinService } from './levenshtein.service';

describe('LevenshteinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LevenshteinService]
    });
  });

  it('should be created', inject([LevenshteinService], (service: LevenshteinService) => {
    expect(service).toBeTruthy();
  }));
});
