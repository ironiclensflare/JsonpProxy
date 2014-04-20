JSON -> JSONP Proxy for UK Crime Data
=====================================

This is a simple node.js proxy to turn various sections of the [data.police.uk](http://data.police.uk) API into JSONP so that you can build a fancy frontend for it with jQuery or similar.

Right now it only supports the ['Street level availability'](http://data.police.uk/docs/method/crimes-street-dates/) endpoint, but I'll be working on adding more soon.

First, we get the server up and running:

	http = require 'http'
	server = http.createServer().listen 8080

The server listens for all requests and looks for a `callback` querystring used by default by jQuery. You can use whatever name for it serves you best.

	server.on 'request', (request, response) ->
		querystring = require('url').parse(request.url, true)
		callbackName = querystring.query['callback']

We set some basic parameters for the HTTP request we will shortly be making.

		options = 
			host: 'data.police.uk'
			path: '/api/crimes-street-dates'

Then we set up a callback function to do something with the received data.

		callback = (rsp) ->

A function is written using the `callbackName` specified in the querystring and is terminated once the HTTP request `end` event is triggered.

			response.write "#{callbackName}("
		
			rsp.on 'data', (chunk) ->
				response.write chunk.toString()
		
			rsp.on 'end', ->
				response.end ')'

Finally we make the HTTP request to retrieve the data and post it back as JSONP.

		http.request(options, callback).end()

You should now have a useable JSONP output for whatever jQuery work you plan on doing.