/**
 * Module dependencies.
 */
var express = require('express');
var fs = require('fs');
var dbURI = 'mongodb://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASSWORD + '@dharma.mongohq.com:10073/lucasprus';
var db = require('mongoose').connect(dbURI);
var app = express();
// Configuration
var logFile = fs.createWriteStream('./access.log', {
  flags: 'a'
});
app.use(express.logger({
  stream: logFile
}));
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
// app.all('*', express.basicAuth('username', 'password'));
// app.use(express.basicAuth('username', 'password'));
/* 
app.use(express.cookieParser('x6f517kW88eEbmSAWRER8SL578CDCu1ot6Tqlt272sn9sRjrQa'));
app.use(express.session({
    secret: 'x6f517kW88eEbmSAWRER8SL578CDCu1ot6Tqlt272sn9sRjrQa',
    maxAge: 3600000
})); 
*/

if ('development' === app.get('env')) {
  app.use('/dist', express.static(__dirname + '/dist'));

  app.use(require('connect-livereload')({
    port: 35729
  }));
  app.use(express.static(__dirname + '/.tmp'));
  app.use(express.static(__dirname + '/app'));
} else if ('production' === app.get('env')) {
  app.use(express.static(__dirname + '/dist'));
}


/*app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET,PUT, POST, DELETE");
    next();
});*/

if ('development' === app.get('env')) {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
} else if ('production' === app.get('env')) {
  app.use(express.errorHandler());
}
// Routes
require('./routes/users')(app);
app.listen(3000, function () {
  console.log("Express server listening on port %d in %s mode", 3000, app.settings.env);
});
