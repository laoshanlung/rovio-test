/**
 * Simulating the data storage in asynchronous environment
 */

var Backbone = require('backbone')
  , when = require('when')
  , _ = require('underscore')

var ingredients = new Backbone.Collection([
  {name: 'tuna'},
  {name: 'cheese'}
]);

var dough = new Backbone.Collection([
  {name: 'normal'},
  {name: 'family'},
  {name: 'pan'}
]);

var orders = new Backbone.Collection();

module.exports = {
  getIngredients: function(options) {
    options = options || {};
    options = _.defaults(options, {
      limit: 10,
      offset: 0
    });

    var data = ingredients.slice(options.offset, options.limit);

    return when(new Backbone.Collection(data));
  },

  getDough: function(options) {
    options = options || {};
    options = _.defaults(options, {
      limit: 10,
      offset: 0
    });

    var data = dough.slice(options.offset, options.limit);

    return when(new Backbone.Collection(data));
  },

  createOrder: function(data) {
    return when(orders.add(data));
  },

  getOrders: function(options) {
    options = options || {};
    options = _.defaults(options, {
      limit: 10,
      offset: 0
    });

    var data = orders.slice(options.offset, options.limit);

    return when(new Backbone.Collection(data));
  }
}