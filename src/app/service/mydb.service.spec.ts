import { TestBed } from '@angular/core/testing';

import { MydbService } from './mydb.service';

describe('MydbService', () => {
  let service: MydbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MydbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
