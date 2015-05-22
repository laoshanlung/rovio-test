define([
  'angular'
  , 'should'
  , 'app'
  , 'controllers/orderForm'
  , 'controllers/orderReport'
  , 'angularMocks'
  , 'angularResource'
], function(angular, should){
  describe('OrderFormController', function() {

    beforeEach(angular.mock.module('pizza'));

    var controller, scope;
    beforeEach(angular.mock.inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('OrderFormController', {
        $scope: scope
      });
    }));

    it('adds/removes ingredients correctly', function(){
      scope.onChangeIngredient('test 1');
      scope.onChangeIngredient('test 2');
      scope.onChangeIngredient('test 3');
      should(scope.selectedIngredients.length).be.equal(3);
      should(scope.selectedIngredients).containDeep(['test 1', 'test 2', 'test 3']);

      scope.onChangeIngredient('test 2');
      should(scope.selectedIngredients.length).be.equal(2);
      should(scope.selectedIngredients).containDeep(['test 1', 'test 3']);
    });
  });
});