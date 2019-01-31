const axios = require('axios');
const is = require('@sindresorhus/is');
const cheerio = require('cheerio');

const getContentFromSelectors = async ({selectors, htmlContent = null, url}) => {
	if (is.urlString(url)) {
		const response = await axios.get(url);
		htmlContent = response.data;
	}

	const $ = cheerio.load(htmlContent);
	const payload = {};
	selectors.map(item => {
		payload[item.label] = null;
		try {
			const text = $(item.selector).text();
			payload[item.label] = text;
			if ('between' in item && ('after' in item.between || 'before' in item.between)) {
				payload[item.label] = text.match(`${item.between.after || ''}(.*)${item.between.before || ''}`)[1];
			}
		} catch (err) {
			console.log(err);
		}
	});
	return payload;
};

module.exports = {
	getContentFromSelectors,
};
