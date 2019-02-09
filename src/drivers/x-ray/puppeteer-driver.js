// https://github.com/brandonmp/x-ray-puppeteer/blob/master/index.js

const debug = require('debug')('x-ray:puppeteer');
const puppeteer = require('puppeteer');

const driver = ({
	launchOptions = {
		headless: true,
		args: ['--no-sandbox', '--disable-gpu', '--single-process'],
	},
	gotoOptions = {
		waitUntil: 'networkidle0',
	},
	waitForSelector,
	proxy = {},

}) => {
	let page;
	let browser;

	return async (ctx, done) => {
		if (!browser) {
			browser = await puppeteer.launch(launchOptions);
		}

		if (!page) {
			page = await browser.newPage();

			if ('username' in proxy && 'password' in proxy) {
				await page.authenticate({
					username: proxy.username,
					password: proxy.password,
				});
				debug('Proxy authenticated');
			}

			debug('going to %s', ctx.url);

			try {
				await page.goto(ctx.url, gotoOptions);
				if (typeof waitForSelector === 'string') {
					await page.waitFor(waitForSelector);
				}
				const html = await page.content();
				debug(
					'got response from %s, content length: %s',
					ctx.url,
					(html || '').length
				);
				ctx.body = html;

				page.close();
				debug(
					'Current page closed'
				);
				page = null;
				done(null, ctx);
			} catch (err) {
				debug('Puppeteer error', err);
				if (err) {
					return done(err);
				}
			}
		}
	};
};

module.exports = driver;
