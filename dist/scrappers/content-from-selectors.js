"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios = require('axios');
const is = require('@sindresorhus/is');
const cheerio = require('cheerio');
const debug = require('debug')('scraperkit');
const getContentFromSelectors = ({ selectors, htmlContent = null, url, requestConfig = {} }) => __awaiter(this, void 0, void 0, function* () {
    if (is.urlString(url)) {
        const response = yield axios.get(url, Object.assign({}, requestConfig));
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
                const { regex } = item;
                const regexResult = text.match(regex);
                if (regexResult.length > 2) {
                    payload[item.label] = regexResult[1];
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    });
    return payload;
});
module.exports = {
    getContentFromSelectors,
};
