exports.index = function (req, res) {
  res.render(req.params.title);
}

exports.setup = function (app) {
  app.get('/job/:title/', exports.index);
}