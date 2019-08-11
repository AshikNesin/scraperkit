"use strict";
// https://github.com/brandonmp/x-ray-puppeteer/blob/master/index.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const debug = require('debug')('x-ray:puppeteer');
const puppeteer = require('puppeteer');
const pRetry = require('p-retry');
const driver = ({ launchOptions = {
    headless: true,
    args: [
        '--no-sandbox',
        '--disable-gpu',
        '--single-process',
    ],
}, gotoOptions = {
    waitUntil: 'networkidle0',
}, waitForSelector, proxy = {}, }) => {
    let page;
    let browser;
    return (ctx, done) => __awaiter(this, void 0, void 0, function* () {
        const run = () => __awaiter(this, void 0, void 0, function* () {
            if (!browser) {
                browser = yield puppeteer.launch(launchOptions);
            }
            if (!page) {
                page = yield browser.newPage();
                if ('username' in proxy && 'password' in proxy) {
                    yield page.authenticate({
                        username: proxy.username,
                        password: proxy.password,
                    });
                    debug('Proxy authenticated');
                }
                debug('going to %s', ctx.url);
                try {
                    yield page.goto(ctx.url, gotoOptions);
                    if (typeof waitForSelector === 'string') {
                        yield page.waitFor(waitForSelector, { timeout: 120000 });
                    }
                    const html = yield page.content();
                    debug('got response from %s, content length: %s', ctx.url, (html || '').length);
                    ctx.body = html;
                    yield page.close();
                    debug('Current page closed');
                    yield browser.close();
                    page = null;
                    browser = null;
                    done(null, ctx);
                }
                catch (err) {
                    yield page.close();
                    yield browser.close();
                    debug('Puppeteer error', err);
                    if (err) {
                        return done(err);
                    }
                }
            }
        });
        yield pRetry(run, {
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
    });
};
module.exports = driver;
