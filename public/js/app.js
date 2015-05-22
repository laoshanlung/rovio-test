define([
  'angular'
  , 'services/apis'
], function(angular){
  var deps = ['apis', 'ngResource'];

  return angular.module('pizza', deps);
});