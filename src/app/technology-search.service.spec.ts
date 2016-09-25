/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TechnologySearchService } from './technology-search.service';

describe('Service: TechnologySearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechnologySearchService]
    });
  });

  it('should ...', inject([TechnologySearchService], (service: TechnologySearchService) => {
    expect(service).toBeTruthy();
  }));
});
