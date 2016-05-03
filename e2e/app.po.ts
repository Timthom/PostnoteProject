export class Postnote2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('postnote2-app p')).getText();
  }
}
