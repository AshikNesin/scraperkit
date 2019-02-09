// const axios = require('./wrappers/axios')
// import { setProxyUrl } from "./utils/proxy";
import { getContentFromSelectors } from "./scrappers/content-from-selectors";
import xRayPuppeteerDriver from './drivers/x-ray/puppeteer-driver'
import xRayAxiosDriver from './drivers/x-ray/axios-driver'

module.exports = {
    // axios,
    // setProxyUrl,
    getContentFromSelectors,
    xRayAxiosDriver,
    xRayPuppeteerDriver
};
