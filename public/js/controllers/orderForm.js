define([
  'underscore'
  , 'app'
], function(_, app){

  function OrderFormController($window, $timeout, $rootScope, $scope, PizzaFactory) {
    $scope.ingredients = [];
    $scope.dough = [];

    $timeout(function(){
      PizzaFactory.getIngredients().$promise.then(function(response){
        $scope.ingredients = $scope.ingredients.concat(response.data);
      });
      
      PizzaFactory.getDough().$promise.then(function(response){
        $scope.dough = $scope.dough.concat(response.data);
        $scope.selectedDough = $scope.dough[0].name;
      });
    });

    var reset = function() {
      $scope.selectedDough = $scope.dough[0].name;
      $scope.selectedIngredients = [];
    }

    $scope.selectedIngredients = [];
    $scope.onChangeIngredient = function(name) {
      var index = $scope.selectedIngredients.indexOf(name);
      if (index > -1) {
        $scope.selectedIngredients.splice(index, 1);
      } else {
        $scope.selectedIngredients.push(name);
      }
    }

    $scope.onSubmit = function() {
      PizzaFactory.createOrder({
        ingredients: $scope.selectedIngredients,
        dough: $scope.selectedDough
      }).$promise.then(function(){
        $rootScope.$emit('newOrder');
        reset();
        $window.alert('Your order has been submitted');
      });
      
      return false;
    }
  }

  app.controller('OrderFormController', ['$window', '$timeout', '$rootScope', '$scope', 'PizzaFactory', OrderFormController]);
});