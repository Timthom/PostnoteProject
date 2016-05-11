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
