import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { FirstLetter } from './first-letter.pipe';

describe('FirstLetter Pipe', () => {
  beforeEachProviders(() => [FirstLetter]);

  it('should transform the input', inject([FirstLetter], (pipe: FirstLetter) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
