import { TestBed } from '@angular/core/testing';

import { DataStoreService } from './data-store.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DataStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: DataStoreService = TestBed.get(DataStoreService);
    expect(service).toBeTruthy();
  });
});
