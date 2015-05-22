define([
  'underscore'
  , 'app'
], function(_, app){

  function OrderReportController($window, $timeout, $scope, PizzaFactory) {
    $scope.orders = [];
    $timeout(function(){
      PizzaFactory.getOrders().$promise.then(function(reponse){
        $scope.orders = $scope.orders.concat(reponse.data);
      });
    });
  }

  app.controller('OrderReportController', ['$window', '$timeout', '$scope', 'PizzaFactory', OrderReportController]);
});