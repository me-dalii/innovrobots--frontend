import { TestBed } from '@angular/core/testing';

import { CustomFileHandlerService } from './custom-file-handler.service';

describe('CustomFileHandlerService', () => {
  let service: CustomFileHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomFileHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
