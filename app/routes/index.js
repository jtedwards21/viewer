var request = require("request")

module.exports = function(app) {
	app.route('/')
		.get(function(req,res) {
			res.sendFile(process.cwd() + '/public/index.html');
		});
　　　　　　　　app.route("/pages/:query")
          .get(function(req, res) {
              var url = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=' + req.params.query;

              var options = {url: url}
              var callback = function(err, response, body){ res.send(body);}
              request(options, callback);
              });
};
