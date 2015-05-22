var express = require('express')
  , http = require('http')
  , path = require('path')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , session = require('cookie-session')
  , swig = require('swig')
  , errorHandler = require('errorhandler')
  , compress = require('compression')
  , _ = require('underscore')
  , moment = require('moment')

var app = express();

app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.enable('trust proxy');

app.use(compress({
  memLevel: 3,
  level: 3
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

var session = require('express-session');

app.use(session({
  key: 'test',
  secret: 'this-is-very-safe',
  proxy: true
}));
app.use(methodOverride());

var env = process.env.NODE_ENV || 'development';

switch (env) {
  case 'production':
    app.set('view cache', true);

    app.use(function(err, req, res, next){
      res.status(404).render('error');
    });
    break;
  case 'test':
    // app.use(logger('dev'));
    
    app.use(errorHandler({
      dumpExceptions : true,
      showStack : true
    }));

    app.set('view cache', false);
    break;
  default:
    app.use(logger('dev'));

    app.use(errorHandler({
      dumpExceptions : true,
      showStack : true
    }));

    app.set('view cache', false);
    break;
}

app.use(express.static('public'));

app.get('/', function(req, res){
  res.locals.jsModule = 'home';
  res.render('home.html');
});

app.use(function(req, res, next){
  res.jsonData = function(data) {
    res.json({data: data});
  }

  res.jsonError = function(error) {
    res.status(500).json({error: error});
  }

  next();
});

app.use('/api', require('./api'));

// Get params
var argv = require('optimist').argv;

// port
var port = argv.port || 4000;

var server = app.listen(port, function() {
  console.log('Express server listening on port ', server.address().port);
});