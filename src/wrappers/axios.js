const axios = require('axios');
const httpsProxyAgent = require('https-proxy-agent');
const {getProxyUrl} = require('../utils/proxy');
const debug = require('debug')('scraperkit');

axios.interceptors.request.use(config =>
	new Promise((resolve, reject) => {
		const newConfig = Object.assign({}, config);
		debug('axios req interceptor. Proxy 👉 %s', getProxyUrl());
		if (getProxyUrl()) {
			const agent = new httpsProxyAgent(getProxyUrl());
			newConfig.httpsAgent = agent;
			resolve(newConfig);
		}
		resolve(config);
	})
);

module.exports = axios;
