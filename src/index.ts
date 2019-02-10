import { getContentFromSelectors } from "./scrappers/content-from-selectors";
import  getHTMLContent from "./scrappers/html-content";
import xRayUtils from './utils/x-ray'
import awsUtils from './utils/aws'

module.exports = {
    getHTMLContent,
    getContentFromSelectors,
    xRayUtils,
    awsUtils
};
