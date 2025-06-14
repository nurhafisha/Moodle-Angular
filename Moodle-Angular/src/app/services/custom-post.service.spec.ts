import { TestBed } from '@angular/core/testing';

import { CustomPostService } from './custom-post.service';

describe('CustomPostService', () => {
  let service: CustomPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
