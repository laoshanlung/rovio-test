define([
  'underscore'
  , 'angular'
], function(_, angular){
  var apis = angular.module('apis', []);

  var prefix = '/api';

  apis.config(['$httpProvider', function ($httpProvider) {
    var interceptor = ['$rootScope', '$q', function($rootScope, $q){
      return {
        request: function(config) {
          var url = config.url;
          if (url.charAt(0) != '/') {
            url = '/' + url;
          }

          config.url = prefix + url;
          return config;
        },

        responseError: function(response) {
          $rootScope.$broadcast('serverError', response.data.error);
          return $q.reject(response.data.error);
        }
      };
    }];

    $httpProvider.interceptors.push(interceptor);
  }]);

  function pizzaFactory($resource){
    var url = '';
    return $resource(url, {
      
    }, {
      'getIngredients': {
        method: 'GET',
        url: url + '/ingredients'
      },
      'getDough': {
        method: 'GET',
        url: url + '/dough'
      },
      'getOrders': {
        method: 'GET',
        url: url + '/orders'
      },
      'createOrder': {
        method: 'POST',
        url: url + '/orders'
      }
    })
  }

  apis.factory('PizzaFactory', ['$resource', pizzaFactory]);

  return apis;
});