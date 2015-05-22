exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:4000',
  specs: ['scenarios.js'],

  onPrepare: function() {
    browser.manage().timeouts().pageLoadTimeout(40000);
    browser.manage().timeouts().implicitlyWait(25000);
    browser.ignoreSynchronization = true;
  }
}