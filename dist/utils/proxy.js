"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require('debug')('scraperkit:crazy');
let proxyUrl;
exports.getProxyUrl = () => {
    debug('getProxyUrl 👉 %s', proxyUrl);
    return proxyUrl;
};
exports.setProxyUrl = (proxy) => {
    debug('setProxyUrl 👉 %s', proxy);
    proxyUrl = proxy;
};
