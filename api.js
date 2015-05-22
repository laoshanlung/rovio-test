var express = require('express')
  , router = express.Router()
  , facade = require('./facade')
  , _ = require('underscore')

router.get('/ingredients', function(req, res, next){
  facade.getIngredients(req.query).done(res.jsonData, res.jsonError);
});

router.get('/dough', function(req, res, next){
  facade.getDough(req.query).done(res.jsonData, res.jsonError);
});

router.get('/orders', function(req, res, next){
  facade.getOrders(req.query).done(res.jsonData, res.jsonError);
});

router.post('/orders', function(req, res, next){
  facade.createOrder(_.pick(req.body, 'ingredients', 'dough')).done(res.jsonData, res.jsonError);
});

module.exports = router;