import { TestBed, inject } from '@angular/core/testing';

import { StreetViewService } from './street-view.service';

describe('StreetViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreetViewService]
    });
  });

  it('should be created', inject([StreetViewService], (service: StreetViewService) => {
    expect(service).toBeTruthy();
  }));
});
