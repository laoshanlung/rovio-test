var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  paths: {
    angular: 'vendors/angular/angular',
    angularMocks: 'vendors/angular-mocks/angular-mocks',
    angularResource: 'vendors/angular-resource/angular-resource',
    should: 'vendors/should/should'
  },

  shim: {
    angular: { exports: 'angular' },
    angularMocks: { deps: ['angular'] },
    angularResource: { deps: ['angular'] }
  },

  // dynamically load all test files
  deps: tests,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
