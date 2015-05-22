var facade = require('./facade')
  , should = require('should')

describe('Facade', function(){
  describe('#createOrder', function(){
    it('creates new order and saves it', function(done){

      facade.createOrder({
        ingridients: ['tuna', 'cheese'],
        dough: 'normal'
      }).then(function(order){
        should(order.cid).be.ok;

        return facade.getOrders().then(function(orders){
          orders.size().should.be.equal(1);
        });

      }).done(done, done);

    });
  });
});