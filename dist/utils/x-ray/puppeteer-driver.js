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
                    yield page.waitFor(waitForSelector);
                }
                const html = yield page.content();
                debug('got response from %s, content length: %s', ctx.url, (html || '').length);
                ctx.body = html;
                page.close();
                debug('Current page closed');
                page = null;
                done(null, ctx);
            }
            catch (err) {
                debug('Puppeteer error', err);
                if (err) {
                    return done(err);
                }
            }
        }
    });
};
module.exports = driver;
