// https://github.com/brandonmp/x-ray-puppeteer/blob/master/index.js

const debug = require('debug')('x-ray:puppeteer');
const puppeteer = require('puppeteer');
const pRetry = require('p-retry');

const driver = ({
	launchOptions = {
		headless: true,
		args: [
			'--no-sandbox',
			'--disable-gpu',
			'--single-process',
		],
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
		const run = async () => {
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
						await page.waitFor(waitForSelector, {timeout: 120000});
					}
					const html = await page.content();
					debug(
						'got response from %s, content length: %s',
						ctx.url,
						(html || '').length
					);
					ctx.body = html;

					await page.close();
					debug(
						'Current page closed'
					);

					await browser.close();

					page = null;
					browser = null;
					done(null, ctx);
				} catch (err) {
					await page.close();
					await browser.close();
					debug('Puppeteer error', err);
					if (err) {
						return done(err);
					}
				}
			}
		};
		await pRetry(run, {
			onFailedAttempt: error => {
				if (page && 'close' in page) {
					page.close();
				}

				if (browser && 'close' in browser) {
					browser.close();
				}
				page = null;
				browser = null;

				console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`);
			},
			retries: 5,
		});
	};
};

module.exports = driver;
