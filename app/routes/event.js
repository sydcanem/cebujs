exports.index = function (req, res) {
  res.render(req.params.title, {app: {title: 'Node Meetup'}});
}

exports.setup = function (app) {
  app.get('/event/:title/', exports.index);
}