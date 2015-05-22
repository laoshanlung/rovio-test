describe('Pizza Store', function() {
  beforeEach(function(){
    browser.get('/');
    browser.sleep(3000);
  });

  it('populates dough selection list', function(done) {
    element.all(by.css('.js-dough')).then(function(items) {
      expect(items.length).toBe(3);
      expect(items[0].getText()).toContain('normal');
      done();
    });
  });
});