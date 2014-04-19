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
		var output = callbackName + '(';

		rsp.on('data', function(chunk){
			output += chunk;
		});

		rsp.on('end', function(){
			output += ')';
			console.log(output);
			response.write(output);
			response.end();
		});
	};
});

