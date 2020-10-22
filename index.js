const https = require('https');
const ip = require('ip');
const config = require('./config')

function apio_process_request(req, res, next) {
  // this middleware adds request timestamp
  req.requestTime = Date.now()/1000;
  next();
}

function apio_process_response(req, res, next) {
  // this middleware collects performance data
  const request_obj = {};
  request_obj.request_timestamp = req.requestTime;
  request_obj.response_timestamp = Date.now()/1000;
  request_obj.ip_address = ip.address();
  request_obj.path = req.protocol + "://" + 
  	req.get('host') + req.originalUrl;
  request_obj.requester = null;
  request_obj.response_code = res.statusCode;
  send_perf_request(request_obj);
  next();
}

function apio_process_exception(err, req, res, next) {
  // this middleware collects exception data
  const error_obj = {};
  error_obj.path = req.protocol + "://" + 
  	req.hostname + req.originalUrl;
  error_obj.exception = "error occured";
  error_obj.traceback = err.stack;
  error_obj.user = null;
  error_obj.ip_address = ip.address();
  send_exception_request(error_obj);
  next();
}

// exports middleware
module.exports.apio_process_request = apio_process_request ;
module.exports.apio_process_response = apio_process_response ;
module.exports.apio_process_exception = apio_process_exception ;

function send_perf_request(perf_data){
	// this posts perf data to apio server
	const data = JSON.stringify(perf_data);

	const options = {
	  hostname: 'https://apio.in',
	  port: 443,
	  path: '/remote_perf_data',
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	    'Content-Length': data.length,
	    'x-api-key': config.apio_token;
	  }
	}

	const req = http.request(options, res => {
  		console.log(`statusCode: ${res.statusCode}`)
  		res.on('data', d => {
    		process.stdout.write(d)
  		})
	})

	req.on('error', error => {
  		console.error(error)
	})
	req.write(data)
	req.end()
}

function send_exception_request(exception_data){
	// this posts exception data to apio server
	const data = JSON.stringify(exception_data);

	const options = {
	  hostname: 'https://apio.in',
	  port: 443,
	  path: '/remote_data_exception',
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	    'Content-Length': data.length,
	    'x-api-key': config.apio_token;
	  }
	}

	const req = http.request(options, res => {
  		console.log(`statusCode: ${res.statusCode}`)
  		res.on('data', d => {
    		process.stdout.write(d)
  		})
	})

	req.on('error', error => {
  		console.error(error)
	})
	req.write(data)
	req.end()
}
