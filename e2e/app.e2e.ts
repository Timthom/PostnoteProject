import { Postnote2Page } from './app.po';

describe('postnote2 App', function() {
  let page: Postnote2Page;

  beforeEach(() => {
    page = new Postnote2Page();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('postnote2 Works!');
  });
});
