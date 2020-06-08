import { TestBed } from '@angular/core/testing';

import { BoardcrudService } from './boardcrud.service';

describe('BoardcrudService', () => {
  let service: BoardcrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardcrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
