define([
  'underscore'
  , 'app'
], function(_, app){

  function OrderReportController($window, $timeout, $rootScope, $scope, PizzaFactory) {
    $scope.orders = [];

    var getOrders = function(reset) {
      PizzaFactory.getOrders().$promise.then(function(reponse){
        if (reset) {
          $scope.orders = reponse.data;
        } else {
          $scope.orders = $scope.orders.concat(reponse.data);
        }
      });
    }

    $timeout(function(){
      getOrders();
    });

    $rootScope.$on('newOrder', function(){
      getOrders(true);
    });
  }

  app.controller('OrderReportController', ['$window', '$timeout', '$rootScope', '$scope', 'PizzaFactory', OrderReportController]);
});