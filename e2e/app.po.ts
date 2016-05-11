export class AngularrctestPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angularrctest-app h1')).getText();
  }
}
