import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { DragulaHelperService } from './dragula-helper.service';

describe('DragulaHelper Service', () => {
  beforeEachProviders(() => [DragulaHelperService]);

  it('should ...',
      inject([DragulaHelperService], (service: DragulaHelperService) => {
    expect(service).toBeTruthy();
  }));
});
