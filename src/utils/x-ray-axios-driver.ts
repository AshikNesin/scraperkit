const axios = require('axios');
const debug = require('debug')('scraperkit');
export const axiosDriver = (opts = {}) => {
	debug({opts})
	return function driver(context:{url:string}, callback?:any) {
		const url = context.url;
		axios.get(url).then(({data}:any) => {
			const body = data;
			return callback(null, body);
		}).catch((err:any) => callback(err, null));
	};
}