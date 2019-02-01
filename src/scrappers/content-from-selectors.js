const axios = require('axios');
const is = require('@sindresorhus/is');
const cheerio = require('cheerio');
const debug = require('debug')('scraperkit');

const getContentFromSelectors = async ({selectors, htmlContent = null, url, requestConfig = {}}) => {
	if (is.urlString(url)) {
		const response = await axios.get(url, {...requestConfig});
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
				const regex = `${item.between.after || ''}(.*)${item.between.before || ''}`;
				const regexResult = text.match(regex);
				if (regexResult.length > 2) {
					payload[item.label] = regexResult[1];
				}
			}
			if ('regex' in item) {
				payload[item.label] = null;
				const {regex} = item;
				const regexResult = text.match(regex);
				if (regexResult.length > 2) {
					payload[item.label] = regexResult[1];
				}
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
