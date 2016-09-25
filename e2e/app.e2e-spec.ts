import { RsrchndevlPage } from './app.po';

describe('rsrchndevl App', function() {
  let page: RsrchndevlPage;

  beforeEach(() => {
    page = new RsrchndevlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
