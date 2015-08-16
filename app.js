var config = require('./lib/getConfig'),
  express = require('express'),
  http = require('http'),
  util = require('util');

var app = express();
var server = http.createServer(app);

// Routes
var index = require('./app/routes/index');
var jobs = require('./app/routes/jobs');
var events = require('./app/routes/event');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/app/views');

// We'll use nginx in production
if ('development' === app.get('env')) {
  app.use(express.static(__dirname + '/public/app'));
}

app.use(function (req, res, next) {
  res.locals = {app: {}};
  next();
});

// Routes 
index.setup(app);


if ('development' === app.get('env')) {
  app.all('/robots.txt', function (req, res){
    res.send('User agent: *\nDisallow: /', {'Content-Type': 'text/plain'});
  });
} else {
  app.all('/robots.txt', function (req, res){
    res.send('User-agent: *', {'Content-Type': 'text/plain'});
  });
}

function NotFound(msg) {
  this.name = "NotFound";
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
}

app.all('*', function (req, res){
  throw new NotFound;
});

// Error middleware
app.use(function(err, req, res, next){
  if (err instanceof NotFound) {
    res.render('404');
  } else {
    var stack = err.stack ? err.stack.split('\n').join('<br/>') : err;
    res.render('500', {error: stack});
  }
});

server.listen(config.app.port, config.app.host, function () {
  util.log('App running at http://' + config.app.host + ':' + config.app.port +
    ' in ' + app.get('env') + ' mode.');
});