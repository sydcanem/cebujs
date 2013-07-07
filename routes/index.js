exports.index = function (req, res) {
	res.render('index', { app : { page : 'main' } } );
}

exports.setup = function (app) {
	app.get('/', exports.index)
}