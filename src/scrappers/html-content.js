const debug = require('debug')('scraperkit-html-content');
const puppeteer = require('puppeteer');
const defaultLaunchOptions = {
	headless: true,
	args: [
		'--no-sandbox',
		'--disable-gpu',
		'--single-process',
	],
};
const getHTMLContent = async ({
	url,
	prerender = true,
	puppeteerOptions = {},
	waitForSelector,
	proxy = {},
}) => {
	// TODO: Implement Non-Prerender sites

	const config = {...puppeteerOptions};

	if (!('launchOptions' in config)) {
		config.launchOptions = defaultLaunchOptions;
	}

	if (!('gotoOptions' in config)) {
		config.gotoOptions = {
			waitUntil: 'networkidle0',
		};
	}

	if (!('waitForSelectorOptions' in config)) {
		config.waitForSelectorOptions = {};
	}

	const browser = await puppeteer.launch(config.launchOptions);
	const page = await browser.newPage();

	if ('username' in proxy && 'password' in proxy) {
		await page.authenticate({
			username: proxy.username,
			password: proxy.password,
		});
		debug('Proxy authenticated');
	}

	if (typeof puppeteerOptions.waitForSelector === 'string') {
		await page.waitFor(waitForSelector, config.waitForSelectorOptions);
	}

	const htmlContent = await page.content();

	debug(
		'got response from %s, content length: %s',
		url,
		(htmlContent || '').length
	);

	await page.close();
	await browser.close();

	return htmlContent;
};

module.exports = getHTMLContent;
