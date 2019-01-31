// Based on https://github.com/brandonmp/x-ray-puppeteer/blob/master/index.js
const debug = require('debug')('x-ray:puppeteer');
const Puppeteer = require('puppeteer');

/**
 * Export `driver`
 */

/**
 * Initialize the `driver`
 * with the following `options`
 *
 * @param {Object} options
 * @param {Function} fn
 * @ param {Object} [goto_options] Options that'll pass to Puppeteer's .goto() method.
 * @ param {String} [waitForSelector]  A css selector that Puppeteer ought to wait for after executing goto()
 * @return {Function}
 * @api public
 */

const driver = (options, fn, goto_options = {}, waitForSelector) => {
	// create above returned function's scope so
	// we re-use the same chromium page each time
	let page; let browser;
	return fn ?
		fn(ctx, done) :
		async (ctx, done) => {
			if (!browser) {
				browser = await Puppeteer.launch(options);
			}
			if (!page) {
				page = await browser.newPage();
			}
			debug('going to %s', ctx.url);

			try {
				await page.goto(ctx.url, goto_options);
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
				done(null, ctx);
			} catch (err) {
				debug('Puppeteer error', err);
				if (err) {
					return done(err);
				}
			}
		};
};
module.exports = driver;
