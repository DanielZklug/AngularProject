import { TestBed } from '@angular/core/testing';

import { Mysql } from './mysql';

describe('Mysql', () => {
  let service: Mysql;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mysql);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
