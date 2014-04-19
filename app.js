var http = require('http');
var server = http.createServer().listen(8080);

server.on('request', function(request, response) {
	
	var querystring = require('url').parse(request.url, true);

	var callbackName = querystring.query['callback'];
	
	var options = {
		host: 'data.police.uk',
		path: '/api/crimes-street-dates'
	};
	
	http.request(options, callback).end();
	
	function callback(rsp) {
		response.write(callbackName + '(');

		rsp.on('data', function(chunk){
			console.log(chunk.toString());
			response.write(chunk.toString());
		});

		rsp.on('end', function(){
			response.end(')');
		});
	};
});

