import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {Postnote2App} from '../app/postnote2.component';

beforeEachProviders(() => [Postnote2App]);

describe('App: Postnote2', () => {
  it('should have the `defaultMeaning` as 42', inject([Postnote2App], (app: Postnote2App) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([Postnote2App], (app: Postnote2App) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});

