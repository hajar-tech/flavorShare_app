import { TestBed } from '@angular/core/testing';

import { SercicesService } from './services.recipe';

describe('SercicesService', () => {
  let service: SercicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SercicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
