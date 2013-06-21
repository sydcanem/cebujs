exports.index = function (req, res) {
	res.render('index');
}

exports.setup = function (app) {
	app.get('/', exports.index)
}