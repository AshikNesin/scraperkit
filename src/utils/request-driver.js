// https://github.com/Crazometer/request-x-ray/blob/master/index.js
// https://github.com/matthewmueller/x-ray/issues/299
const Request = require('request');
const Proxy = require('../utils/proxy')
const proxy = new Proxy()

function makeDriver(opts = {}) {
	console.log({opts, px: proxy.getProxyUrl() })
	if (typeof opts === 'function') {

		if(proxy.getProxyUrl() && !opts.proxy){
			console.log('new proxy')
			opts.proxy = getProxyUrl()
		}
		var request = opts;
	} else {
		var request = Request.defaults(opts);
	}

	return function driver(context, callback) {
		const url = context.url;

		request(url, (err, response, body) => {
			return callback(err, body);
		});
	};
}

module.exports = makeDriver;
