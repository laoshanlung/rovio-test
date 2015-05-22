require([
  'angular'
  , 'app'
  , 'controllers/orderForm'
  , 'controllers/orderReport'
], function(angular){
  angular.bootstrap(document, ['pizza']);
});