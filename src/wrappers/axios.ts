const axios = require('axios');
const httpsProxyAgent = require('https-proxy-agent');
const {getProxyUrl} = require('../utils/proxy');
const debug = require('debug')('scraperkit');

interface InterceptorParams {
    httpsAgent?: any;
}

axios.interceptors.request.use((config:InterceptorParams = {}) =>
	new Promise((resolve) => {
		const newConfig = {...config}
		debug('axios req interceptor. Proxy 👉 %s', getProxyUrl());
		if (getProxyUrl()) {
			const agent = new httpsProxyAgent(getProxyUrl());
			newConfig.httpsAgent = agent;
			resolve(newConfig);
		}
		resolve(config);
	})
);

export default axios;