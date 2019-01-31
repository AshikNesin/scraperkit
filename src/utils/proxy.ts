const debug = require('debug')('scraperkit:crazy');
let proxyUrl:string;
export const getProxyUrl = () => {
    debug('getProxyUrl 👉 %s',proxyUrl);
   return proxyUrl;
}
export const setProxyUrl = (proxy:string) => {
    debug('setProxyUrl 👉 %s',proxy);
    proxyUrl = proxy;
}