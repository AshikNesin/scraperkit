const {x} = require('./wrappers/x-ray')
const axios = require('./wrappers/axios')
import { setProxyUrl } from "./utils/proxy";
import { getContentFromSelectors } from "./scrappers/content-from-selectors";


module.exports = {
    x,
    axios,
    setProxyUrl,
    getContentFromSelectors

};
