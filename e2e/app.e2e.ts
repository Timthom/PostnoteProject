<<<<<<< HEAD
import { AngularrctestPage } from './app.po';

describe('angularrctest App', function() {
  let page: AngularrctestPage;

  beforeEach(() => {
    page = new AngularrctestPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('angularrctest works!');
  });
});
=======
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
>>>>>>> Uffe
