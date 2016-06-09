import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { SortNotes } from './sort-notes.pipe';

describe('SortNotes Pipe', () => {
  beforeEachProviders(() => [SortNotes]);

  it('should transform the input', inject([SortNotes], (pipe: SortNotes) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
