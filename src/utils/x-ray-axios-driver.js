const axios = require('axios')

function axiosDriver(opts = {}) {
	return function driver(context, callback) {
		const url = context.url;
		axios.get(url).then((response) => {
			const body = response.data;
			return callback(null, body);
		}).catch(err => callback(err,null))
	};
}


module.exports = axiosDriver;
