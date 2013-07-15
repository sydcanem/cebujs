// Middleware for attaching the livereload client file
var port = 35729;

var getSnippet = function () {
  /*jshint quotmark:false */
  var snippet = [
          "<!-- livereload snippet -->",
          "<script>document.write('<script src=\"http://'",
          " + (location.host || 'localhost').split(':')[0]",
          " + ':" + port + "/livereload.js?snipver=1\"><\\/script>')",
          "</script>",
          ""
          ].join('\n');
  return snippet;
};

module.exports = function (req, res, next) {
	var render = res.render;

	res.render = function (views, options, fn) {
		var self = this
			, options = options || {};

		// support callback function as second arg
	  	if ('function' == typeof options) {
	    	fn = options, options = {};
	  	}

		var fn = fn || function (error, html) {
			if (error !== null) req.next(error); 

		    html = html.replace(/<\/body>/, function (w) {
		      	return getSnippet() + w;
		    });

		    self.send(html);
		};

		render.call(res, views, options, fn);
	};

	next();
};