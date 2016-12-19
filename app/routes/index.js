var request = require("request")

module.exports = function(app) {
	app.route('/')
		.get(function(req,res) {
			res.sendFile(process.cwd() + '/public/index.html');
		});
　　　　　　　　app.route("/pages/:query")
          .get(function(req, res) {
              var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + req.params.query;

              var options = {url: url}
              var callback = function(err, response, body){ res.send(body);}
              request(options, callback);
              });
};
