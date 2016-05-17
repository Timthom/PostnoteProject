import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ValueService } from './value.service';

describe('Value Service', () => {
  beforeEachProviders(() => [ValueService]);

  it('should ...',
      inject([ValueService], (service: ValueService) => {
    expect(service).toBeTruthy();
  }));
});
