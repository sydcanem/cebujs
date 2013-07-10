var config = require('./lib/siteConfig'),
	express = require('express'),
	http = require('http'),
	path = require('path');

var app = express();
var server = http.createServer(app);

exports.app = app;

// Routes
var index = require('./routes/index');
var jobs = require('./routes/jobs');
var events = require('./routes/event');

app.configure(function() {
	app.set('view engine', 'ejs');
	
	if ('development' == app.get('env')) {
		app.set('views', __dirname + '/public/app/views');
		app.use(express.logger('dev'));
		app.use(express.static(path.join(__dirname, 'public/app')));
	} else {;
		app.set('views', __dirname + '/public/dist/views');
	}

	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(function (req, res, next) {
		res.locals = {app: {}};
		next();
	})
	index.setup(app);
	jobs.setup(app);
	events.setup(app);
	app.use(app.router);
});

app.configure('development', function () {
	app.use(function(err, req, res, next){
		if (err instanceof NotFound) {
			res.render('404');
		} else {
			var stack = err.stack ? err.stack.split('\n').join('<br/>') : err;
			res.render('500', {error: stack});
		}
	});
	app.all('/robots.txt', function (req, res){
		res.send('User agent: *\nDisallow: /', {'Content-Type': 'text/plain'});
	});
});

app.configure('production', function () {
	app.use(function (err, req, res, next){
		if (err instanceof NotFound) {
			res.render('404');
		} else {
			res.render('500', {error: ''});
		}
	});
	app.all('/robots.txt', function (req, res){
		res.send('User-agent: *', {'Content-Type': 'text/plain'});
	});
});

function NotFound(msg) {
	this.name = "NotFound";
	Error.call(this, msg);
	Error.captureStackTrace(this, arguments.callee);
}

app.all('*', function (req, res){
	throw new NotFound;
});

module.exports = server.listen(config.app.port, config.app.host);